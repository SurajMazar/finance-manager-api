import { Request } from 'express-serve-static-core';
import prisma from '../../../utils/prisma.utils';
import {IncomeRepositoryInterface} from './income.interface';


export class IncomeRepository implements IncomeRepositoryInterface{

  async store(req:Request){
    try{
      const {
        title,
        amount,
        cat_id
      } = req.body;
      const income = await prisma.income.create({
        data:{
          title:title,
          amount:parseFloat(amount),
          createdAt:new Date(),
          updatedAt:new Date(),
          cat_id:Number(cat_id),
        }
      });
      return income;
    }catch(e){
      throw e;
    }
  }

}