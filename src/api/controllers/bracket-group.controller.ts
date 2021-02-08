import BracketGroup, { IBracketGroup } from '../models/bracket-group.model';
import logger from '../../logger';
import { Request, Response } from 'express';
import { BracketGroupService } from '../services/bracket-group.service';


class  BracketGroupController {
    constructor() {
    }
    static getAll = (request: Request, response: Response) => {
        BracketGroupService.getAll().then((bracketGroups) => {
            return response.status(200).json(bracketGroups);
        }).catch((e: any) => {
            logger.error("Error getting bracketGroups: " + e);
            return response.status(500).send();
        })
    }
    
    static getOne = (request: Request, response: Response) => {
        BracketGroupService.getOne(request.params.bracketGroupId).then((bracketGroup) => {
            if (bracketGroup) {
                return response.status(200).json(bracketGroup);
            } else {
                return response.status(404).send();
            }
        }).catch((e: any) => {
            logger.error("unable to get bracketGroup: " + e);
            return response.status(500).send();
        });
    }

    static getAllByOwnerId = (request: Request, response: Response) => {
        BracketGroupService.getAllByOwner(request.params.ownerId).then((bracketGroups) => {
            return response.status(200).json(bracketGroups);
        }).catch((e: any) => {
            logger.error("Error getting bracketGroups: " + e);
            return response.status(500).send();
        })
    }

    static create = (request: Request, response: Response) => {
        BracketGroupService.create(request.body).then((bracketGroup: IBracketGroup) => {
            return response.status(200).json(bracketGroup);
        }).catch((e: any) => {
            logger.error("unable to create bracketGroup: " + e);
            return response.status(500).send();
            
        });
    }

    static update = (request: Request, response: Response) => {
        BracketGroupService.update(request.params.bracketGroupId, request.body).then((bracketGroup: IBracketGroup) => {
            if (bracketGroup) {
                return response.status(200).json(bracketGroup);
            } else {
                return response.sendStatus(404);
            }
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        });
    }

    static delete = (request: Request, response: Response) => {
        BracketGroupService.delete(request.params.bracketGroupId).then(() => { 
            return response.status(200).send();
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        });
    }
}

export default BracketGroupController;