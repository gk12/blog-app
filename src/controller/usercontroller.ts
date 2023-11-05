import User from '../model/usermodel';
import { User1 } from '../types/interface';
import express, { Request, Response } from 'express';
import hashPassword from './../middleware/hash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response) => {
  const { username, name, password, email }: User1 = req.body;
  try {
    const check_dup = await User.findOne({ email });
    if (check_dup) {
      return res.end('User with this email already exists');
    }
    const hashedpass = await hashPassword(password);
    const user = await User.create({
      username,
      name,
      email,
      password: hashedpass,
    });
    res.status(201).json({
      username: user.username,
      name: user.name,
      email: user.email,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: 'something went wrong',
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    if (users.length == 0) {
      return res.end('No users found');
    }
    res.json({
      users,
    });
  } catch (error) {
    console.log(error);
    res
      .json({
        message: 'something went wrong',
      })
      .status(400);
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password }:User1 = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const hashed = await bcrypt.compare(password, user.password);
      if (hashed) {
        const secretKey = process.env.SECRETKEY || '';
        const token = jwt.sign({ username }, secretKey, { expiresIn: '2h' });
        return res.status(200).json({
          message: 'user loggedIn successfully',
          username,
          token: token,
        });
      }
      return res
        .json({
          message: 'not a valid username or password',
          hashed,
        })
        .status(400);
    }
    return res.json({
      message:"user not found"
    })
  } catch (error) {
    console.log(error)
    res
      .json({
        message: 'something went wrong',
      })
      .status(400);
  }
};
export const updateUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, password }:User1 = req.body;
  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      return res.end('user not found');
    }
    if (name) {
      user.name = name;
    }
    if (password) {
      const hashedpass = await hashPassword(password);
      user.password = hashedpass;
    }
    user.save();
    res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    console.log(error);
  }
};
export const deleteUsers = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.end('User not found');
    }
    await User.findByIdAndRemove(id);
    res.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.json({
      message: 'something went wrong',
    });
  }
};
