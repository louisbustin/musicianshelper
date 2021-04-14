import { Request, Response } from 'express';
import logger from 'src/logger';
import Band from '../models/band.model';

export default class BandController {

    static getAll = (request: Request, response: Response) => {

        Band.find({}).then((bands) => {
            return response.status(200).json(bands);
        }).catch(err => { 
            return response.status(500);
        });

    }
    static create = (request: Request, response: Response) => {
        //remove the _id field so that mongoose will populate it correct on returning
        delete request.body._id;
        Band.create(request.body).then((band) => {
            if (band) {
                return response.status(200).json(band);
            } else {
                logger.error("unable to create user")
                return response.status(500);
            }
        }).catch(e => {
            logger.error("unable to create user: " + e);
            return response.status(500);
        });
    }
    
    
}