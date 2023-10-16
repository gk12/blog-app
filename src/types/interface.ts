import  {Document} from 'mongoose'

export interface User1 extends Document{
  username:string,
  name:string,
  email:string,
  password:string
}

export interface Db{
  PORT:number
}
export interface Iblog{
  blog:string;
}