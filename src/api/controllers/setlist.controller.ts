import { Request, Response } from 'express';
import logger from 'src/logger';
import Setlist from '../models/setlist.model';

export default class SetlistController {

    static getAll = (request, response: Response) => {

        Setlist.find({ owner: request.user.sub}).then((list) => {
            return response.status(200).json(list);
        }).catch(err => { 
            logger.error("error retrieving setlists: " + err)
            return response.status(500).send();
        });

    }
    static getOne = (request: any, response: Response) => {
        Setlist.findOne({ _id: request.params.setlistId, owner: request.user.sub }).then(list => {
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

    static byBand = (request: any, response: Response) => {
        Setlist.find({ owner: request.user.sub, band: request.params.bandId }).exec().then((list) => {
            return response.status(200).json(list);
        }).catch(err => { 
            logger.error("error retrieving setlists: " + err)
            return response.status(500).send();
        }); 
    }
    static create = (request: any, response: Response) => {
        //remove the _id field so that mongoose will populate it correct on returning
        delete request.body._id;
        request.body.owner = request.user.sub;
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

    static update = (request: any, response: Response) =>{
        //validate
        if (request.params.setlistId) {
            if (request.params.setlistId !== request.body._id) {
                return response.status(400).json({ "error": "id must math in parameter and body"});
            }
        } else {
            return response.status(400).json({"error": "setlistid must be in parameters"});
        }

        request.body.owner = request.user.sub;

        Setlist.findOneAndUpdate({ _id: request.params.setlistId, owner: request.user.sub }, request.body, {new : true}).then((list) => {
            if (list) {
                return response.status(200).json(list);
            } else {
                logger.error("an error occurred during save of setlist " + request.params.setlistId);
                return response.status(404).send();
            }
        }).catch((err) => {
            logger.error("unable to update setlist: " + err);
            return response.status(500).send();
        });
    }

}