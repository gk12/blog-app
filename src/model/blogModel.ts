import mongoose from 'mongoose';
import { Iblog } from '../types/interface';
const blogmodel =new mongoose.Schema({
  Uid:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  blog:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now()
  },
  updatedAt:{
    type:Date,
    default:new Date(),
  },
  commentId:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  upvoteCount:{
    type:Number,
    default:0
  },
  upvoteBy:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ]

})

const Blog = mongoose.model<Iblog>('Blog',blogmodel);
export default Blog;