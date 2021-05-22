import { NextFunction, Request, Response } from 'express';
import {validationResult} from 'express-validator';
import { formatResponse } from '../../../utils/response.util';

export const validate = (req:Request,res:Response,next:NextFunction)=>{
  const errors = validationResult(req);

  if(errors.isEmpty()){
    return next();
  }

  const formattedError:any = [];

  errors.array().map(err=>{
    formattedError.push({
      [err.param]:err.msg
    })
  })

  return res.status(422).json(formatResponse({
    errors:formattedError
  },false))
}