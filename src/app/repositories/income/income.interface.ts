import { Income } from "@prisma/client";
import { Request } from "express";


export interface IncomeRepositoryInterface{
  index(req:Request):Promise<any>;
  store(req:Request):Promise<Income>;
  update(req:Request):Promise<Income>;
}