import { Response } from 'express';
import logger from 'src/logger';
import Band from '../models/band.model';

export default class BandController {

    static getAll = (request: any, response: Response) => {

        Band.find({ owner: request.user.sub }).then((bands) => {
            return response.status(200).json(bands);
        }).catch(err => { 
            return response.status(500);
        });

    }
    static create = (request: any, response: Response) => {
        //remove the _id field so that mongoose will populate it correct on returning
        delete request.body._id;

        //take the new band with the current user as the owner
        request.body.owner = request.user.sub;
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

    static update = (request: any, response: Response) =>{
        //validate
        if (request.params.bandId) {
            if (request.params.bandId !== request.body._id) {
                return response.status(400).json({ "error": "id must math in parameter and body"});
            }
        } else {
            return response.status(400).json({"error": "bandId must be in parameters"});
        }
        
        //tag the request wit the current user id. this user must be the owner of the existing band in order to update it
        request.body.owner = request.user.sub;
        
        //only allow authenticated user to update bands they own
        Band.findOneAndUpdate({ _id: request.params.bandId, owner: request.user.sub }, request.body, {new : true}).then((band) => {
            if (band) {
                return response.status(200).json(band);
            } else {
                logger.error("an error occurred during save of band " + request.params.bandId);
                return response.status(404).send();
            }
        }).catch((err) => {
            logger.error("unable to update band: " + err);
            return response.status(500).send();
        });
    }
}