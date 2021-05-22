import { response } from "express";
import { Request, Response } from "express-serve-static-core";
import { formatResponse } from "../../../utils/response.util";
import { AuthRepository } from "../../repositories/auth/auth.repository";
import jwt, { JsonWebTokenError, } from 'jsonwebtoken';
import { JWT_EXPIRY, JWT_SECRET_KEY } from "../../config/site.config";

export class AuthController {

  private authRepository:AuthRepository;
  
  constructor(){
    this.authRepository = new AuthRepository();
  }

  async login(req:Request,res:Response){
    try{
      const {email,password} = req.body;
      const user = await this.authRepository.login(email,password);
      jwt.sign({user},JWT_SECRET_KEY,{expiresIn:JWT_EXPIRY},(err:any,token:any)=>{
        if(err){
          throw err;
        }
        res.status(200).json(formatResponse({
          token:token,
          user:user
        },true));
      })
    }catch(e){
      response.status(500).json(formatResponse(e,false))
    }
  }

}

