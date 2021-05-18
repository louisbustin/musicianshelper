/* eslint-disable consistent-return */
import { Response } from 'express';
import logger from '../logger';
import Zip, { IZip } from '../models/zip.model';

export default class ZipController {
  /**
   * Returns zip details for a given zip code
   * @param request request containing params, including zip to search for
   * @param response response
   */
  static getByZip = (request: any, response: Response) => {
    const errors = [];
    if (!request.params.zip) {
      errors.push('must supply zip to search for');
    }
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }
    Zip.find({ zip: request.params.zip }).then((zip) => {
      if (zip) {
        return response.status(200).json(zip);
      }
      return response.status(404).send();
    }).catch((err) => {
      logger.error(`unable to get zip details: ${err}`);
      return response.status(500).send();
    });
  }

  static getByPartial = (request: any, response: Response) => {
    const errors: string[] = [];
    ZipController.verifyZipParam(request.params).forEach((x) => errors.push(x));
    if (errors.length > 0) {
      return response.status(400).json(errors);
    }
    Zip.find({ zip: { $regex: `^${request.params.zip}.*` } }).then((zip) => {
      if (zip) {
        return response.status(200).json(zip);
      }
      return response.status(404).send();
    }).catch((err) => {
      logger.error(`unable to get zip details: ${err}`);
      return response.status(500).send();
    });
  }

  static verifyZipParam = (params: any) => {
    const errors = [];
    if (!params.zip) {
      errors.push('must supply zip to search for');
    } else if (params.zip.length < 2 || params.zip.length > 5) {
      errors.push('supplied zip must be between two and five digits');
    }
    return errors;
  }

  /**
   * Returns all zip codes that are within the radius in miles of the provided zip
   * technically, the radius will be a SQUARE, not a circle.
   * @param zip zip code from which to search
   * @param radius radius out from this zip
   */
  static getAllZipsWithinRadiusOfZip(zip: string, radius: number): Promise<IZip[]> {
    return new Promise<IZip[]>((resolve, reject) => {
      // first get the zip details
      Zip.findOne({ zip }).then((zipdetails) => {
        if (zipdetails) {
          // now get the amount of change in latitude and longitude for this radius from this zip
          const changes = this.getChangesInLatLong(radius, zipdetails.lat);
          const maxLatitude = zipdetails.lat + changes.changeInLatitude;
          const minLatitude = zipdetails.lat - changes.changeInLatitude;
          const maxLongitude = zipdetails.lng + changes.changeInLongitude;
          const minLongitude = zipdetails.lng - changes.changeInLongitude;

          // and then, search for Zip codes that line within that block of lat/long
          Zip
            .find({
              lat: { $gte: minLatitude, $lte: maxLatitude },
              lng: { $gte: minLongitude, $lte: maxLongitude },
            })
            .then((zips) => {
              if (zips) {
                resolve(zips);
              }
            }).catch((err) => {
              logger.error(`unable to search by lat/long for zips: ${err}`);
              resolve([]);
            });
        } else {
          reject(new Error('unable to find zip code'));
        }
      }).catch((err) => {
        logger.error(`cannot retrieve zip codes: ${err}`);
        resolve([]);
      });
    });
  }

  static getChangesInLatLong(miles: number, latitude: number) {
    const returnValue = {
      changeInLatitude: 0,
      changeInLongitude: 0,
    };
    const earthRadius = 3960.0;
    const degreesToRadians = Math.PI / 180.0;
    const radiansToDegrees = 180.0 / Math.PI;

    // longitude
    const r = earthRadius * Math.cos(latitude * degreesToRadians);
    returnValue.changeInLongitude = Math.abs((miles / r) * radiansToDegrees);

    // latitude
    returnValue.changeInLatitude = Math.abs((miles / earthRadius) * radiansToDegrees);

    return returnValue;
  }
}
