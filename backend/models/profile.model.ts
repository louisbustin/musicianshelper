import {
  model, Schema, Model, Document,
} from 'mongoose';

export interface IProfile extends Document {
  name: string;
  email: string;
  useAuthProfilePic: boolean,
  profilePic: {
    data: Buffer,
    contentType: String
  };
  owner: string;
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
});

const Profile: Model<IProfile> = model<IProfile>('Profile', ProfileSchema);

export default Profile;
