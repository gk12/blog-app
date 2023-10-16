require('./db/db');
import express,{Request,Response} from 'express';
import {
  deleteUsers,
  getUsers,
  login,
  register,
  updateUsers,
} from './controller/usercontroller';
const app = express();
app.use(express.json())
const PORT = 4000;

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
