import { Income } from "@prisma/client";
import { Request } from "express";


export interface IncomeRepositoryInterface{
  store(req:Request):Promise<Income>;
}