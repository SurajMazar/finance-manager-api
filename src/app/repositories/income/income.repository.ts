import { Request } from 'express-serve-static-core';
import { getAuthUser } from '../../../utils/jwt.utils';
import prisma from '../../../utils/prisma.utils';
// import { paginate } from '../../../utils/response.util';
// import { ItemPerPage } from '../../config/site.config';
import {IncomeRepositoryInterface} from './income.interface';


export class IncomeRepository implements IncomeRepositoryInterface{



  async index(req:Request){
    try{    
      // const page = Number(req.query.page);
      const keyword = (req.query.keyword)?.toString() || '';
      let category:any = req.query.category || undefined;
      const month =req.query.month ? new Date(req.query.month as string) : new Date();
      const user = getAuthUser(req);

      let cat:Array<number> | number | undefined = [];
      if(category){
        if(Array.isArray(category)){
          category.forEach((c:any)=>{
            if(Array.isArray(cat)){
              cat.push(Number(c))
            }
          })
        }else{
          cat =Number(category);
        }
      }else{
        cat = undefined;
      }

      const incomes = await prisma.income.findMany({
        where:{
          cat_id:{
            in:cat
          },
          userId:user.id,
          OR:{
            title:{contains:keyword},
          },
          createdAt:{
            gt:new Date(month.getFullYear(), month.getMonth(), 1),
            lt:new Date(month.getFullYear(), month.getMonth() + 1, 1)
          }
         
        },
        orderBy:{
          createdAt:'desc'
        },
        include:{
          category:true
        },
        // skip:page * ItemPerPage - ItemPerPage || 0,
      });
      return incomes;
      // const total = await prisma.income.count({where:{ cat_id:{
      //   in:cat
      // },userId:user.id,OR:{title:{contains:keyword},},createdAt: {gte:startDate,lt:endDate},},});
      // return paginate('income',page,total,incomes);
    }catch(e){
      throw new Error(e);
    }
  }
  

  async store(req:Request){
    try{
      const {
        title,
        amount,
        cat_id
      } = req.body;

      const user = getAuthUser(req)

      const income = await prisma.income.create({
        data:{
          title:title,
          amount:parseFloat(amount),
          createdAt:new Date(),
          updatedAt:new Date(),
          cat_id:Number(cat_id),
          userId:user.id
        }
      });
      return income;
    }catch(e){
      console.log(e)
      throw e;
    }
  }

  async update(req:Request){
    try{
      const {
        title,
        amount,
        cat_id
      } = req.body;
      const id = Number(req.params.id);
      const income = await prisma.income.update({
        where:{
          id:id
        },
        data:{
          title:title,
          amount:parseFloat(amount),
          updatedAt:new Date(),
          cat_id:cat_id
        }
      });
      return income;
    }catch(e){
      throw e;
    }
  }

}