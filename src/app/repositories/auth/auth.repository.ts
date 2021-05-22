
import {AuthRepositoryInterface} from './auth.interface';
import prisma from '../../../utils/prisma.utils';

const bcrypt = require('bcrypt');

export class AuthRepository implements AuthRepositoryInterface{

  async login(email:string,password:string){
    try{
      const user = await prisma.user.findUnique({
        where:{
          email:email
        }
      });
      if(user){
        const value = await bcrypt.compare(password,user.password);
        if(value){
          const LoginUser:any = user;
          delete LoginUser.password;
          return LoginUser;
        } 
      }
      throw "Invalid credentials";
    }catch{
      throw "Invalid credentials";
    }
  }

}

