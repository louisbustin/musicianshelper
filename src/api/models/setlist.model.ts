import { model, Schema, Model, Document } from 'mongoose';

export interface ISetlist extends Document {
    name: string;
}

const SetlistSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
});

const Setlist: Model<ISetlist> = model<ISetlist>('Setlist', SetlistSchema);

export default Setlist;
