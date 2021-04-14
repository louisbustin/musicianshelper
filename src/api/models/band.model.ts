import { model, Schema, Model, Document } from 'mongoose';

export interface IBand extends Document {
    name: string;
    email: string;
}

const BandSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Band: Model<IBand> = model<IBand>('Band', BandSchema);

export default Band;
