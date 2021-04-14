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

    static update = (request: Request, response: Response) =>{
        //validate
        if (request.params.bandId) {
            if (request.params.bandId !== request.body._id) {
                return response.status(400).json({ "error": "id must math in parameter and body"});
            }
        } else {
            return response.status(400).json({"error": "bandId must be in parameters"});
        }

        Band.findByIdAndUpdate(request.params.bandId, request.body, {new : true}).then((band) => {
            if (band) {
                return response.status(200).json(band);
            } else {
                logger.error("an error occurred during save of band " + request.params.bandId);
                return response.status(500).json({"error": "an error occurred during save. was the id correct?"});
            }
        }).catch((err) => {
            logger.error("unable to update band: " + err);
            return response.status(500).send();
        });
    }
}