import { model, Schema, Model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    
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
});

const User: Model<IUser> = model<IUser>('User', UserSchema);

export default User;
