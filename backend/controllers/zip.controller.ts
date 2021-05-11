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
    
  }
}
