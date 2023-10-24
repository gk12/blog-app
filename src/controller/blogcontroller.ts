import mongoose from 'mongoose';
import Blog from '../model/blogModel';
import express, { Request, Response } from 'express';
import User from '../model/usermodel';
const userId = async (username: string) => {
  const user = await User.findOne({ username });
  const Uid = user?._id;
  return Uid;
};
export const createBlogs = async (req: Request, res: Response) => {
  const { blog } = req.body;
  const username = req.user.username;
  try {
    const Uid = await userId(username);
    const blog1 = await Blog.create({ Uid, blog });
    res.status(201).json({
      message: 'Blog created successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: 'something went wrong',
    });
  }
};

export const updateBlogs = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { blog } = req.body;
  try {
    const message1 = await Blog.findById(id);
    if (!message1) {
      return res.status(404).json({
        message: 'blog not found',
      });
    }
    // const blog1=await Blog.findByIdAndUpdate({_id:id,blog:blog,updatedAt:new Date().toISOString()});
    message1.blog = blog;
    message1.updatedAt = new Date().toISOString();
    const blog1 = await message1.save();
    // console.log(message.blog)

    res.status(200).json({
      blog1,
      message: 'blog updated successfully',
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await Blog.find();
    res.json({
      blogs,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getAllBlogsByUserId = async (req: Request, res: Response) => {
  const username = req.user.username;
  try {
   const Uid =  await userId(username);
   const blogs = await Blog.find({Uid});
   res.json({
    blogs,
   })
  } catch (error) {
    console.log(error);
  }
};
export const deleteBlogs = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blog1 = await Blog.findById(id);
    if(!blog1){
      return res.json({
        message:"blog not found"
      })
    }
    await Blog.findByIdAndRemove(id);
    res.json({
      message:"blog deleted successfully"
    })
  } catch (error) {
    console.log(error)
    res.json({
      message:'something went wrong'
    }).status(400)
  }
};
