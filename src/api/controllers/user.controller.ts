import User, { IUser } from '../models/user.model';

import { Request, Response } from 'express';

class UserController {
    static getAll = (request: Request, response: Response) => {
        User.find({}).then((users) => {
            return response.status(200).json(users);
         }).catch((e: any) => {
             console.log(e);
             return response.status(500).send();
         });
    }
    
    static getOne = (request: Request, response: Response) => {
        return response.status(200).json({"works": true});
    }

    static create = (request: Request, response: Response) => {
        User.create(request.body).then((user: IUser) => {
            return response.status(200).json(user);
        }).catch((e: any) => {
            console.log(e);
            return response.status(500).send();
        });
    }

    static update = (request: Request, response: Response) => {
        return response.status(200).json({"works": true});
    }

    static delete = (request: Request, response: Response) => {
        return response.status(200).json({"works": true});
    }
    
}

export default UserController;