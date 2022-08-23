import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserRole } from '../constants/types';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      default: UserRole.Regular,
      enum: Object.values(UserRole),
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    banned: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true,
    },
    resetPasswordToken: String,
    city: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    gamertag: {
      type: String,
      lowercase: true,
      unique: true,
      default: '',
    },
    twitchId: {
      type: String,
      default: '',
    },
    facebookId: {
      type: String,
      default: '',
    },
    googleId: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    image: String,
    imagePublicId: String,
    coverImage: String,
    coverImagePublicId: String,
    entries: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Entry',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  role: string;
  fullName: string;
  email: string;
  emailVerified: string;
  banned: boolean;
  password: string;
  username: string;
  resetPasswordToken: string;
  facebookId: string;
  googleId: string;
  gamertag: string;
  twitchId: string;
  verified: boolean;
  city: string;
  state: string;
  country: string;
  isOnline: boolean;
  image: string;
  imagePublicId: string;
  coverImage: string;
  coverImagePublicId: string;
  entries: string[];
  isValidPassword: (password: string) => Promise<boolean>;
}

UserSchema.pre<IUser>('save', async function (next) {
  if (this.password) {
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
  }
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this as IUser;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export default mongoose.model<IUser>('User', UserSchema);

