import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: { 
        type: String, 
        required: false 
    },
    lastName: { 
        type: String, 
        required: false 
    },
    userType: {
        type: String,
        enum : ['user','admin'],
        default: 'user',
        required: true
    }
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;
