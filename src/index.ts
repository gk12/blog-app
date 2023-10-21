require('./db/db');
import express, { Request, Response, NextFunction } from 'express';
import {
  deleteUsers,
  getUsers,
  login,
  register,
  updateUsers,
} from './controller/usercontroller';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
const PORT = 4000;
declare module 'express' {
  interface Request {
    user?: any;
  }
}
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization');

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - Token not provided' });
  }
  const secretKey = process.env.SECRETKEY || "";
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
    req.user = decoded;
    next();
  });
}

// login user
app.post('/login', login);

// register user
app.post('/register', register);

// get all the users
app.get('/getusers', getUsers);

// update users
app.put('/updateusers/:id', updateUsers);

// delete users
app.delete('/deleteusers/:id', deleteUsers);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
