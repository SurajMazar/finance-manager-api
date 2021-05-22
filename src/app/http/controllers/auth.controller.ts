import { Request, Response } from "express";
import { formatResponse } from "../../../utils/response.util";
import { AuthRepository } from "../../repositories/auth/auth.repository";
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET_KEY } from "../../config/site.config";


const authRepository = new AuthRepository();
export class AuthController {

  async login(req:Request,res:Response){
    try{
      const {email,password} = req.body;
      const user = await authRepository.login(email,password);
      jwt.sign({user},JWT_SECRET_KEY,{expiresIn:JWT_EXPIRY},(err:any,token:any)=>{
        if(err){
          throw new JsonWebTokenError(err);
        }
        res.status(200).json(formatResponse({
          token:token,
          user:user
        },true));
      })
      // console.log(user)
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }


  async profile(req:Request,res:Response){
    try{
      const authUser = await authRepository.profile(req);
      res.status(200).json(formatResponse(authUser,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }


}

