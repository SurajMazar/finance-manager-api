import { User } from '@prisma/client';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { getToken } from '../app/middleware/auth.middleware';

interface decode{
  user:User
}

export const getAuthUser = (req:Request)=>{
  const token = getToken(req);
  const user:decode = jwt.decode(token) as decode;
  return user.user;
}