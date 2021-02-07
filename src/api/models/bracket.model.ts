import { model, Schema, Model, Document } from 'mongoose';

export interface IBracket extends Document {

}

const BracketSchema: Schema = new Schema({

});

const Bracket: Model<IBracket> = model<IBracket>('Bracket', BracketSchema);

export default Bracket;
