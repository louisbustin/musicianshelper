import {
  model, Schema, Model, Document,
} from 'mongoose';

export interface IZip extends Document {
  zip: string;
  lat: number;
  lng: number;
  city: string;
  stateId: string;
  stateName: string;
  ztca: boolean;
  parentZcta: string;
  population: number;
  density: number;
  countyFips: number;
  countyName: string;
  countyNames: [string];
  countyFipsAll: [number];
  imprecise: boolean;
  military: boolean;
  timezone: string;
}

const ZipSchema: Schema = new Schema({

  zip: {
    type: String,
    required: true,
    indexed: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  stateId: {
    type: String,
    required: true,
  },
  stateName: {
    type: String,
    required: true,
  },
  ztca: {
    type: Boolean,
  },
  parentZcta: {
    type: String,
  },
  population: {
    type: Number,
  },
  density: {
    type: Number,
  },
  countyFips: {
    type: Number,
  },
  countyName: {
    type: String,
  },
  countyNames: [{
    type: String,
  }],
  countyFipsAll: [{
    type: Number,
  }],
  imprecise: {
    type: Boolean,
  },
  military: {
    type: Boolean,
  },
  timezone: {
    type: String,
  },
});

const Zip: Model<IZip> = model<IZip>('Zips', ZipSchema);

export default Zip;
