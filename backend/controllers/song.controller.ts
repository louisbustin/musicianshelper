/* eslint-disable consistent-return */
import { Response } from 'express';
import Song, { ISong } from '../models/song.model';
import logger from '../logger';

export default class SongController {
  static getAll = (request: any, response: Response) => {
    Song.find({}).then((songs: ISong[]) => response.status(200).json(songs))
      .catch((err) => {
        logger.error(`unable to retrieve songs: ${err}`);
      });
  };

  static getOne = (request: any, response: Response) => {
    Song.findOne({ _id: request.params.songId, owner: request.user.sub }).then((songs) => {
      if (songs) {
        return response.status(200).json(songs);
      }
      return response.status(404).send();
    }).catch((e) => {
      logger.error(`unable to get song: ${e}`);
      return response.status(500).send();
    });
  }

  static byBand = (request: any, response: Response) => {
    Song.find({ owner: request.user.sub, band: request.params.bandId }).exec()
      .then((songs) => response.status(200).json(songs)).catch((err) => {
        logger.error(`error retrieving songs: ${err}`);
        return response.status(500).send();
      });
  }

  static create = (request: any, response: Response) => {
    // remove the _id field so that mongoose will populate it correct on returning
    delete request.body._id;
    request.body.owner = request.user.sub;
    Song.create(request.body).then((song) => {
      if (song) {
        return response.status(200).json(song);
      }
      logger.error('unable to create song');
      return response.status(500).send();
    }).catch((e) => {
      logger.error(`unable to create song: ${e}`);
      return response.status(500).send();
    });
  }

  static update = (request: any, response: Response) => {
    // validate
    if (request.params.songId) {
      if (request.params.songId !== request.body._id) {
        return response.status(400).json({ error: 'id must match in parameter and body' });
      }
    } else {
      return response.status(400).json({ error: 'songid must be in parameters' });
    }

    request.body.owner = request.user.sub;

    Song.findOneAndUpdate(
      { _id: request.params.songId, owner: request.user.sub },
      request.body, { new: true },
    )
      .then((song) => {
        if (song) {
          return response.status(200).json(song);
        }
        logger.error(`an error occurred during save of song ${request.params.songId}`);
        return response.status(404).send();
      }).catch((err) => {
        logger.error(`unable to update song: ${err}`);
        return response.status(500).send();
      });
  }

  static delete = (request: any, response: Response) => {
    const userId: string = request.user.sub;
    Song.findOneAndDelete(
      { _id: request.params.songId, owner: userId },
    ).then((deleted) => {
      if (deleted) {
        return response.status(200).json(deleted);
      }
      return response.status(404).send();
    }).catch((err) => {
      logger.error(err);
      return response.status(500).send();
    });
  }
}
