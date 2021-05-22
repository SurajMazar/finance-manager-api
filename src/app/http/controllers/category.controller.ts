import { Request, Response } from 'express';
import { formatResponse } from '../../../utils/response.util';
import {CategoryRepository} from '../../repositories/category/category.repository';


const Category = new CategoryRepository();


export class CategoryController{


  async index(req:Request,res:Response){
    try{
      const categories = await Category.index(req);
      res.status(200).json(formatResponse(categories,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }

  async store(req:Request,res:Response){
    try{
      const category = await Category.store(req);
      res.status(200).json(formatResponse(category,true));
    }catch(e){
      // console.log(e)
      res.status(500).json(formatResponse(e,false));
    }
  }

  async update(req:Request,res:Response){
    try{
      const category = await Category.update(req);
      res.status(200).json(formatResponse(category,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }

}