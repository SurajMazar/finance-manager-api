import { Category } from "@prisma/client";
import { Request } from "express";

export interface CategoryRepositoryInterface{
  index(req:Request):Promise<any>;
  store(req:Request):Promise<Category>;
  update(req:Request):Promise<Category>;
}