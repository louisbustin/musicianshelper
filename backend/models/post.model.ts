import {
  Document, model, Model, Schema,
} from 'mongoose';

export interface IPost extends Document {
  title: string;
  createdAt: Date;
  modifiedAt: Date;
  postedAt: Date;
  body: string;
  teaser: string;
}

const PostSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    length: 255,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  postedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  body: {
    type: String,
  },
  teaser: {
    type: String,
    length: 512,
  },
});

const Post: Model<IPost> = model<IPost>('Post', PostSchema);

export default Post;
