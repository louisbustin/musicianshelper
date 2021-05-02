import {
  model, Schema, Model, Document,
} from 'mongoose';

export interface IEmail extends Document {
      data: any;
      error: string;
      successInfo: any;
      sendDate: Date;
  }

const EmailSchema: Schema = new Schema({
  data: {
    type: Object,
    required: true,
  },
  error: {
    type: String,
    required: false,
  },
  successInfo: {
    type: Object,
    required: false,
  },
  sendDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Email: Model<IEmail> = model<IEmail>('Email', EmailSchema);

export default Email;
