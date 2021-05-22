import { Request } from "express";


export interface AuthRepositoryInterface{
  login(email:string,password:string):Promise<any>;
}

