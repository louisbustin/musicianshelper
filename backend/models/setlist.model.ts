import {
  model, Schema, Model, Document,
} from 'mongoose';
import { IBand } from './band.model';
import { ISong } from './song.model';

export interface ISetlist extends Document {
    name: string;
    band: IBand['_id'];
    notes: string;
    songs?: [{
      order: number;
      song: ISong['_id'];
    }]
}

const SetlistSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  band: {
    type: Schema.Types.ObjectId,
    ref: 'Band',
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
  owner: {
    type: String,
    required: true,
    index: true,
  },
  songs: {
    type: [{
      order: {
        type: Number,
        required: true,
      },
      song: {
        type: Schema.Types.ObjectId,
        ref: 'Song',
      },
    }],
  },
});

const Setlist: Model<ISetlist> = model<ISetlist>('Setlist', SetlistSchema);

export default Setlist;
