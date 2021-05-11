import { Response } from 'express';
import logger from '../logger';
import Zip from '../models/zip.model';

export default class ZipController {
  /**
   * Returns zip details for a given zip code
   * @param request request containing params, including zip to search for
   * @param response response
   */
  // eslint-disable-next-line consistent-return
  static getByZip = (request: any, response: Response) => {
    const errors = [];
    if (!request.params.zip) {
      errors.push('must supply zip to search for');
    }
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }
    Zip.find({ zip: request.parmas.zip }).then((zip) => {
      if (zip) {
        return response.status(200).json(zip);
      }
      return response.status(404).send();
    }).catch((err) => {
      logger.error(`unable to get zip details: ${err}`);
      return response.status(500).send();
    });
  }
}
