import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const url:any = process.env.URL
export async function connectToDatabase(cb:any) {
  try {
    await mongoose.connect(url);
    console.log('Database connected successfully');
    cb()
  } catch (error) {
    console.log(error);
  }
}

