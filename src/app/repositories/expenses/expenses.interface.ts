import { Expense } from "@prisma/client";
import { Request } from "express";


export interface ExpenseRepositoryInterface{
  index(req:Request):Promise<any>;
  store(req:Request):Promise<Expense>;
  update(req:Request):Promise<Expense>;
  getByDate(req:Request):Promise<any>;
}