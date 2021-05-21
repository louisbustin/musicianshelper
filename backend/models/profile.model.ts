import {
  model, Schema, Model, Document,
} from 'mongoose';

export interface IProfile extends Document {
  name: string;
  email: string;
  useAuthProfilePic: boolean,
  ssoProfilePicLink: string,
  profilePic: {
    data: Buffer,
    contentType: String
  };
  owner: string;
  zip: string;
  instrumentTags: [string];
  lookingForTags: [string];
}

const ProfileSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  useAuthProfilePic: {
    type: Boolean,
    required: true,
    default: true,
  },
  ssoProfilePicLink: {
    type: String,
    required: false,
  },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
  owner: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  zip: {
    type: String,
    required: false,
  },
  instrumentTags: {
    type: [String],
    required: false,
  },
  lookingForTags: {
    type: [String],
    required: false,
  },
});

const Profile: Model<IProfile> = model<IProfile>('Profile', ProfileSchema);

export default Profile;
