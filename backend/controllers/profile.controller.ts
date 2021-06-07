/* eslint-disable consistent-return */
import { Response } from 'express';
import logger from '../logger';
import Profile from '../models/profile.model';
import ZipController from './zip.controller';

export default class ProfileController {
  /**
   * Returns a single profile owned by the login from the bearer token
   * @param request request of the API call
   * @param response reponse to send to client
   */
  static getOneByCurrentUser = (request: any, response: Response) => {
    Profile.findOne({ owner: request.user.sub }).then((p) => {
      if (p) {
        return response.status(200).json(p);
      }
      return response.status(404).send();
    }).catch(() => response.status(500));
  }

  /**
   * Returns a single profile
   * @param request request of the API call
   * @param response reponse to send to client
   */
  static getOneByProfileId = (request: any, response: Response) => {
    // validate
    if (!request.params.profileId) {
      return response.status(400).json({ error: 'profileId must be in parameters' });
    }

    Profile.findOne({ _id: request.params.profileId }).then((p) => {
      if (p) {
        return response.status(200).json(p);
      }
      return response.status(404).send();
    }).catch(() => response.status(500));
  }

  /**
   * Creates a new profile entry and returns its details
   * @param request request of the API call
   * @param response reponse to send to client   */
  static create = (request: any, response: Response) => {
    // remove the _id field so that mongoose will populate it correct on returning
    delete request.body._id;

    // take the new band with the current user as the owner
    request.body.owner = request.user.sub;
    Profile.create(request.body).then((p) => {
      if (p) {
        return response.status(200).json(p);
      }
      logger.error('unable to create profile');
      return response.status(500).send();
    }).catch((e) => {
      logger.error(`unable to create profile: ${e}`);
      return response.status(500).send();
    });
  }

  /**
   * Updates a profile entry and returns its details.
   * It will only update the profile found by the current user from the bearer token
   * @param request request of the API call
   * @param response reponse to send to client   */
  static update = (request: any, response: Response) => {
    // validate
    if (request.params.profileId) {
      if (request.params.profileId !== request.body._id) {
        return response.status(400).json({ error: 'id must match in parameter and body' });
      }
    } else {
      return response.status(400).json({ error: 'profileId must be in parameters' });
    }

    // tag the request wit the current user id.
    // this user must be the owner of the existing band in order to update it
    request.body.owner = request.user.sub;

    // only allow authenticated user to update bands they own
    Profile.findOneAndUpdate(
      { _id: request.params.profileId, owner: request.user.sub },
      request.body, { new: true },
    ).then((p) => {
      if (p) {
        return response.status(200).json(p);
      }
      logger.error(`an error occurred during save of profile ${request.params.profileId}`);
      return response.status(404).send();
    }).catch((err) => {
      logger.error(`unable to update profile: ${err}`);
      return response.status(500).send();
    });
  }

  static uploadProfilePic = (request: any, response: Response) => {
    // request.file should have the file in there
    if (request.file) {
      const updatedPic = {
        profilePic: {
          data: request.file.buffer,
          contentType: request.file.mimetype,
        },
      };
      Profile.findOneAndUpdate({ owner: request.user.sub }, updatedPic, { new: true })
        .then((profile) => {
          if (profile) {
            return response.status(200).json(profile);
          }
          return response.status(404).send();
        })
        .catch((err) => {
          logger.error(`unable to update profile pic: ${err}`);
          return response.status(500).send();
        });
    } else {
      logger.error('unable to update profile pic: no upload found');
      return response.status(500).send();
    }
  }

  /**
   * Request will contain two parameters, one will be the zip code to base the search and
   * the second will be the radius distance from that zip code to search
   * @param request request
   * @param response response
   * @returns all profiles within radius distance of the provided zip code
   */
  static getByDistanceFromZip = (request: any, response: Response) => {
    const errors = [];
    ZipController.verifyZipParam(request.params).forEach((x) => errors.push(x));

    if (!request.params.radius) {
      errors.push('must include radius parameter');
    } else if (request.params.radius > 500) {
      errors.push('search radius must be 500 miles or less');
    }
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    // first we will find all zip codes within the x miles of the provided zip code
    ZipController.getAllZipsWithinRadiusOfZip(
      request.params.zip,
      request.params.radius,
    ).then((zips) => {
      Profile.where('zip').in(zips.map((z) => z.zip)).then((profiles) => {
        if (profiles) {
          return response.status(200).json(profiles);
        }
        return response.status(404).send();
      }).catch((err) => {
        logger.error(`unable to retrieve profiles: ${err}`);
        return response.status(500).send();
      });
    }).catch((err) => {
      logger.error(err);
      return response.status(500).send();
    });
  }

  /**
   * Request body will contain search parameters;
   *   zip
   *   radius
   *   influencesTags
   *   instrumentTags
   *   lookingForTags
   * @param request request containing search params in the body
   * @param response response to be sent to the client
   */
  static search = (request:any, response: Response) => {
    const { lookingForTags } = request.body;
    const { influencesTags } = request.body;
    const { instrumentTags } = request.body;
    const { zip } = request.body;
    const { radius } = request.body;

    let query = Profile.find();

    if (lookingForTags) {
      query = query.where({ lookingForTags: { $in: lookingForTags } });
    }

    if (influencesTags) {
      query = query.where({ influencesTags: { $in: influencesTags } });
    }

    if (instrumentTags) {
      query = query.where({ instrumentTags: { $in: instrumentTags } });
    }

    if (zip && radius) {
      ZipController.getAllZipsWithinRadiusOfZip(zip, radius).then((zips) => {
        query.where('zip').in(zips.map((z) => z.zip)).then((profiles) => {
          if (profiles) {
            return response.status(200).json(profiles);
          }
          return response.status(404).send();
        }).catch((err) => {
          logger.error(err);
          return response.status(500).send();
        });
      }).catch((err) => {
        logger.error(err);
        return response.status(500).send();
      });
    } else {
      query.then((profiles) => {
        if (profiles) {
          return response.status(200).json(profiles);
        }
        return response.status(404).send();
      }).catch((err) => {
        logger.error(`unable to search profiles ${err}`);
        return response.status(500).send();
      });
    }
  }
}
