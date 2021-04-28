/* eslint-disable consistent-return */
import { Response } from 'express';
import logger from '../logger';
import Post from '../models/post.model';

export default class PostController {
  static getAll = (request: any, response: Response) => {
    Post.find({})
      .then((list) => {
        if (list) {
          return response.status(200).json(list);
        }
        return response.status(500).send();
      })
      .catch((err) => {
        logger.error(`error retrieving setlists: ${err}`);
        return response.status(500).send();
      });
  }

  static getOne = (request: any, response: Response) => {
    Post.findOne({ _id: request.params.postId })
      .then((post) => {
        if (post) {
          return response.status(200).json(post);
        }
        return response.status(404).send();
      }).catch((e) => {
        logger.error(`unable to get post: ${e}`);
        return response.status(500).send();
      });
  }

  /**
   * Returns news items for the news page, with the following paramters:
   * - postedAt date < Now
   * - order by postedAt
   * - limit by parameter provided, or 20 if no param provided
   */
  static getTopItems = (request: any, response: Response) => {
    let limit: number = request?.params?.limit;
    const cutoff = new Date();
    if (!limit) {
      limit = 20;
    }

    Post.find({ postedAt: { $lt: cutoff } })
      .sort({ postedAt: -1 })
      .limit(Number(limit))
      .then((postList) => {
        if (postList) {
          return response.status(200).json(postList);
        }
        return response.status(404).send();
      })
      .catch((e) => {
        logger.error(`unable to get top posts: ${e}`);
        return response.status(500).send();
      });
  }

  static create = (request: any, response: Response) => {
    Post.create(request.body).then((post) => {
      if (post) {
        return response.status(200).json(post);
      }
      return response.status(500).send();
    });
  }
}
