import {
  model, Schema, Model, Document,
} from 'mongoose';

export interface ISong extends Document {
      name: string;
      artist: string;
      lyrics: string;
      notes: string;
      band: string;
  }

const SongSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: false,
  },
  lyrics: {
    type: String,
    required: false,
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
});

const Setlist: Model<ISong> = model<ISong>('Song', SongSchema);

export default Setlist;
