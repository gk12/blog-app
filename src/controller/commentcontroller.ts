import Comment from '../model/commentModel';
import express, { Request, Response } from 'express';
import User from '../model/usermodel';
import Blog from '../model/blogModel';
import { Icomments } from '../types/interface';
const userId = async (username: string) => {
  const user = await User.findOne({ username });
  const Uid = user?._id;
  return Uid;
};
export const WriteComment = async (req: Request, res: Response) => {
  const { comment, Bid }:Icomments = req.body;
  const username = req.user.username;
  try {
    const Uid = await userId(username);
    const comments = await Comment.create({ Uid, Bid, comment });
    const Blogs = await Blog.findById({ _id: Bid });
    Blogs?.commentId.push(comments._id);
    Blogs?.save();
    console.log(Blogs)
    return res.send(comments);
  } catch (error) {
    console.log(error);
  }
};
export const UpdateComment = async (req: Request, res: Response) => {
  const { Bid, comment }:Icomments = req.body;
  try {
    const comments = await Comment.findOneAndUpdate({ Bid, comment });
    res.send(comments);
  } catch (error) {
    console.log(error);
  }
};
export const DeleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comments = await Comment.findByIdAndDelete({ _id: id });
    return res.send(comments ? 'delete successfully' : 'Did not find comment');
  } catch (error) {
    console.log(error);
  }
};

