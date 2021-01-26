/**
 * This is a business layer between the conttroller for API and the raw mongoose models
 */
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
        return User.create(user);
    }


    static update = (id: string, user: IUser) => {
        return User.findByIdAndUpdate(id, user);
    }

    static delete = (id: string) => {
        return User.findByIdAndDelete(id);
    }

}
