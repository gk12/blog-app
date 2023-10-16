import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
const url:any = process.env.URL
async function connectToDatabase() {
  try {
    await mongoose.connect(url);
    console.log('Database connected successfully');
  } catch (error) {
    console.log(error);
  }
}
connectToDatabase();
