/* eslint-disable consistent-return */
import { Queue } from 'bullmq';
import { Response } from 'express';
import logger from '../logger';

export default class EmailController {
  static queueEmail = (request: any, response: Response) => {
    // verify minimum email parameters
    const errors = [];
    if (!request.body.to) {
      errors.push("must have 'to' address");
    }
    if (!request.body.subject) {
      errors.push('must have subject');
    }
    if (!request.body.from) {
      errors.push('must have from address');
    }
    if (!request.body.body) {
      errors.push('must have body');
    }
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }

    const queue = new Queue('emails', {
      connection: {
        host: 'redis-12534.c232.us-east-1-2.ec2.cloud.redislabs.com',
        port: 12534,
        password: process.env.redispass,
      },
    });
    queue.add('email', request.body)
      .then(() => response.status(204).send())
      .catch((err) => {
        logger.error(`error queuing email: ${err}`);
        return response.status(500).send();
      });
  }
}
