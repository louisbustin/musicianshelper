import { Request, Response } from 'express';
import logger from 'src/logger';
import Setlist from '../models/setlist.model';

export default class SetlistController {

    static getAll = (request: Request, response: Response) => {

        Setlist.find({}).then((list) => {
            return response.status(200).json(list);
        }).catch(err => { 
            logger.error("error retrieving setlists: " + err)
            return response.status(500).send();
        });

    }
    static getOne = (request: Request, response: Response) => {
        Setlist.findById(request.params.setlistId).then(list => {
            if (list) {
                return response.status(200).json(list);
            } else {
                return response.status(404).send();
            }
        }).catch((e) => {
            logger.error("unable to get setlist: " + e);
            return response.status(500).send();
        });
    }

    static byBand = (request: Request, response: Response) => {
        Setlist.find({ band: request.params.bandId }).exec().then((list) => {
            return response.status(200).json(list);
        }).catch(err => { 
            logger.error("error retrieving setlists: " + err)
            return response.status(500).send();
        }); 
    }
    static create = (request: Request, response: Response) => {
        //remove the _id field so that mongoose will populate it correct on returning
        delete request.body._id;
        Setlist.create(request.body).then((list) => {
            if (list) {
                return response.status(200).json(list);
            } else {
                logger.error("unable to create setlist")
                return response.status(500).send();
            }
        }).catch(e => {
            logger.error("unable to create setlist: " + e);
            return response.status(500).send();
        });
    }

    static update = (request: Request, response: Response) =>{
        //validate
        if (request.params.setlistId) {
            if (request.params.setlistId !== request.body._id) {
                return response.status(400).json({ "error": "id must math in parameter and body"});
            }
        } else {
            return response.status(400).json({"error": "setlistid must be in parameters"});
        }

        Setlist.findByIdAndUpdate(request.params.setlistId, request.body, {new : true}).then((list) => {
            if (list) {
                return response.status(200).json(list);
            } else {
                logger.error("an error occurred during save of setlist " + request.params.setlistId);
                return response.status(500).json({"error": "an error occurred during save. was the id correct?"});
            }
        }).catch((err) => {
            logger.error("unable to update setlist: " + err);
            return response.status(500).send();
        });
    }

}