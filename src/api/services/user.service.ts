/**
 * This is a business layer between the conttroller for API and the raw mongoose models
 */
import logger from 'src/logger';
import User, { IUser } from '../models/user.model';

export class UserService { 

    static getAll = () => {
        return User.find({});
    }

    static getOne = (id: string) => {
        return User.findById(id);
    }

    static getOneByEmail = (email: string) => {
        return User.findOne({email});
    }
    
    static search = (body: any) => {
        return User.find(body);
    }

    static create = (user: IUser) => {
        return new Promise((resolve, reject) => {
            User.findOne({email: user.email}).then((found: IUser) => {
                if (found) {
                    resolve(found);
                } else {
                    User.create(user).then((created: IUser) => {
                        if (created) {
                            resolve(created);
                        } else {
                            logger.error("unable to create user")
                            reject("unable to create user");
                        }
                    });
                }
            }).catch((e: any) => {
                logger.error("unable to create user: " + e);
                reject(e);
            });
        });
    }


    static update = (id: string, user: IUser) => {
        return User.findByIdAndUpdate(id, user, {new : true});
    }

    static delete = (id: string) => {
        return User.findByIdAndDelete(id);
    }

}
