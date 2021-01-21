import User, { IUser } from '../models/user.model';
import logger from '../../logger';

import { Request, Response } from 'express';

class UserController {
    static getAll = (request: Request, response: Response) => {
        User.find({}).then((users) => {
            return response.status(200).json(users);
         }).catch((e: any) => {
             logger.error(e);
             return response.status(500).send();
         });
    }
    
    static getOne = (request: Request, response: Response) => {
        User.findById(request.params.userId)
        .then((user:IUser) => {
            return response.status(200).json(user);
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        })
    }

    static create = (request: Request, response: Response) => {
        User.create(request.body).then((user: IUser) => {
            return response.status(200).json(user);
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        });
    }

    static update = (request: Request, response: Response) => {
        User.findByIdAndUpdate(request.params.userId, request.body).then((user) => {
            return response.status(200).json(user);
        }).catch((e: any) => {
            logger.error(e);
        });
    }

    static delete = (request: Request, response: Response) => {
        User.findByIdAndDelete(request.params.userId).then(() => { 
            return response.status(200).send();
        }).catch((e: any) => {
            logger.error(e);
            return response.status(500).send();
        });
    }
    
}

export default UserController;