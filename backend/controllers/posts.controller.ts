/* eslint-disable consistent-return */
import { Response } from 'express';
import logger from '../logger';
import Post from '../models/post.model';

export default class PostController {
  static getAll = (request: any, response: Response) => {
    Post.find({ })
      .then((list) => response.status(200).json(list))
      .catch((err) => {
        logger.error(`error retrieving setlists: ${err}`);
        return response.status(500).send();
      });
  }

  static getOne = (request: any, response: Response) => {
    Post.findOne({ _id: request.params.postId })
      .then((list) => {
        if (list) {
          return response.status(200).json(list);
        }
        return response.status(404).send();
      }).catch((e) => {
        logger.error(`unable to get post: ${e}`);
        return response.status(500).send();
      });
  }
}
