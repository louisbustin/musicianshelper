import User, { IUser } from '../models/user.model';
import logger from '../../logger';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';


class UserController {
    constructor() {
    }
    static getAll = (request: Request, response: Response) => {
        UserService.getAll().then((users) => {
            return response.status(200).json(users);
        }).catch((e) => {
            logger.error("Error getting users: " + e);
            return response.status(500).send();
        })
    }
    
    static getOne = (request: Request, response: Response) => {
        UserService.getOne(request.params.userId).then((user) => {
            if (user) {
                return response.status(200).json(user);
            } else {
                return response.status(404).send();
            }
        }).catch((e) => {
            logger.error("unable to get user: " + e);
            return response.status(500).send();
        });

    }

    static getOneByEmail = (request: Request, response: Response) => {
        let email = request.body.email;
        if (email) {
            UserService.getOneByEmail(email).then((user: IUser) => {
                if (user) {
                    return response.status(200).json(user).send();
                } else {
                    response.sendStatus(404);
                }
            }).catch((e: any) => {
                logger.error("getOneByEmail failed: " + e);
                return response.sendStatus(500);
            })
        } else {
            return response.status(400).json('{"error": "email required"').send();
        }
    }

    static create = (request: Request, response: Response) => {
        UserService.create(request.body).then((user: IUser) => {
            return response.status(200).json(user);
        }).catch((e: any) => {
            logger.error("unable to create user: " + e);
            return response.status(500).send();
            
        });
    }

    static update = (request: Request, response: Response) => {
       UserService.update(request.params.userId, request.body).then((user: IUser) => {
            return response.status(200).json(user);
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        });
    }

    static delete = (request: Request, response: Response) => {
        UserService.delete(request.params.userId).then(() => { 
            return response.status(200).send();
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        });
    }
}

export default UserController;