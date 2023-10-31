import mongoose from 'mongoose'
import { Icomments } from '../types/interface';
const CommentSchema = new mongoose.Schema({
  Uid:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User'
  },
  Bid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Blog'
  },
  comment:{
    type:String
  }
});

const Comment  = mongoose.model<Icomments>('Comment',CommentSchema);
export default Comment