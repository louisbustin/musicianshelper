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
    members: IUser['_id'][];

}

const BracketGroupSchema: Schema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'Users'},
    name: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: false, maxlength: 5000},
    members: { type: [Schema.Types.ObjectId], required: false }
});

const BracketGroup: Model<IBracketGroup> = model<IBracketGroup>('Bracket', BracketGroupSchema);

export default BracketGroup;
