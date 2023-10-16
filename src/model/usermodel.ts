import mongoose from 'mongoose';
import { User1 } from '../types/interface';
const usermodel = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model<User1>('User',usermodel)
export default User