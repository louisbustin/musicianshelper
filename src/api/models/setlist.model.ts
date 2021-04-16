import { model, Schema, Model, Document } from 'mongoose';

export interface ISetlist extends Document {
    name: string;
    band: string;
    notes: string;
}

const SetlistSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    band: {
        type: Schema.Types.ObjectId, 
        ref: 'Band',
        required: true
    },
    notes: {
        type: String,
        required: false
    },
    owner: {
        type: String,
        required: true,
        index: true
    }
});

const Setlist: Model<ISetlist> = model<ISetlist>('Setlist', SetlistSchema);

export default Setlist;
