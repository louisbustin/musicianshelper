/* eslint-disable consistent-return */
import { Response } from 'express';
import logger from '../logger';
import Profile from '../models/profile.model';

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
   * Returns a single profile owned by the login from the bearer token
   * @param request request of the API call
   * @param response reponse to send to client
   */
  static getOneByProfileId = (request: any, response: Response) => {
    // validate
    if (request.params.profileId) {
      if (request.params.profileId !== request.body._id) {
        return response.status(400).json({ error: 'id must math in parameter and body' });
      }
    } else {
      return response.status(400).json({ error: 'profileId must be in parameters' });
    }

    Profile.findOne({ _id: request.params.profileId, owner: request.user.sub }).then((p) => {
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
        return response.status(400).json({ error: 'id must math in parameter and body' });
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
}
