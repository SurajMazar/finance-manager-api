import { NextFunction, Request, Response } from "express";
import jwt,{ JsonWebTokenError } from "jsonwebtoken";
import { formatResponse } from "../../utils/response.util";
import { JWT_SECRET_KEY } from "../config/site.config";


export const getToken = (req:Request)=>{
  const authorization = req.headers.authorization;
  if(!authorization){
    throw new JsonWebTokenError("No authorization token");
  }

  try{
    let token = authorization?.split('Bearer ')[1];
    return token;
  }catch{
    throw new JsonWebTokenError("Invalid token format")
  }
}

const authError = (res:Response) =>{
  res.status(422).json(formatResponse(
    {error:'unauthenticated'},false
  ))
}


const jwtMiddleWare = async (req:Request,res:Response,next:NextFunction)=>{
  try{
    const token = getToken(req);
    await jwt.verify(token,JWT_SECRET_KEY);
    next();
  }catch(e){
    if(e instanceof JsonWebTokenError){
      authError(res);
      return;
    }
    res.status(500).json(formatResponse({
      error:e
    },false));
  }
}

export default jwtMiddleWare;