import { model, Schema, Model, Document } from 'mongoose';
import * as _ from "lodash";

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    sessions: ISession[];
}

export interface ISession   {
    token: string,
    expiresAt: number
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    password: {
        type: String
    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;
