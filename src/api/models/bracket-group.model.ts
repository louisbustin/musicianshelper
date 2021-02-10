import { model, Schema, Model, Document } from 'mongoose';
import { IUser } from './user.model';

export interface IBracketGroup extends Document {
    //bracket groups have:
    //brackets
    //owner -> link to users
    //members -> array of links to users (maybe have a role on this link to allow members)
    //items/teams -> array of links to bracketitems
    owner: IUser['_id'];
    name: string;
    description: string;
    members: IBracketGroupMember[];

}

export interface IBracketGroupMember {
    user: IUser['_id'];
    role: string;
    verifyToken: string;
    verifyDate: Date;
}

const BracketGroupSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Users'},
    name: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: false, maxlength: 5000},
    members: { type: [
        { 
            user: { type: Schema.Types.ObjectId, ref: 'Users', required: true }, 
            role: { type: String, enum : ['user','admin'], default: 'user', required: true },
            verifyToken: { type: String, required: true },
            verifyDate: { type: Date, required: false }
        }
    ], required: false }
});

const BracketGroup: Model<IBracketGroup> = model<IBracketGroup>('BracketGroup', BracketGroupSchema);

export default BracketGroup;
