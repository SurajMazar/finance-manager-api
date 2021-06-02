import { Request } from 'express';
import { formatDate, getStartEndHr } from '../../../utils/common.utils';
import { getAuthUser } from '../../../utils/jwt.utils';
import prisma from '../../../utils/prisma.utils';
// import { paginate } from '../../../utils/response.util';
// import { ItemPerPage } from '../../config/site.config';
import {ExpenseRepositoryInterface} from './expenses.interface';


export class ExpensesRepository implements ExpenseRepositoryInterface{


  async index(req:Request){
    try{    
      const month =req.query.month ? new Date(req.query.month as string) : new Date();
      const keyword = (req.query.keyword)?.toString() || '';
      let category:any = req.query.category || undefined;


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
      const user = getAuthUser(req)

      const incomes = await prisma.expense.findMany({
        where:{
          userId:user.id,
          OR:{
            title:{contains:keyword},
          },
          cat_id:{
            in:cat
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
      // const total = await prisma.expense.count({where:{cat_id:{
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
      const expense = await prisma.expense.create({
        data:{
          title:title,
          amount:parseFloat(amount),
          createdAt:new Date(),
          updatedAt:new Date(),
          userId:user.id,
          cat_id:Number(cat_id),
        },
        include:{
          category:true
        }
      });
      return expense;
    }catch(e){
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
      const expense = await prisma.expense.update({
        where:{
          id:id
        },
        data:{
          title:title,
          amount:parseFloat(amount),
          updatedAt:new Date(),
          category:cat_id,
        },
        include:{
          category:true
        }
      });
      return expense;
    }catch(e){
      throw e;
    }
  }



  async getByDate(req:Request){
    try{
      const date = req.query.date || null ;
      const user = getAuthUser(req);
      const currentDate = date? new Date(date as string):new Date(formatDate());
      const nextDate = new Date(currentDate.getTime() + 60 * 60 * 24 * 1000);

      const expenses = await prisma.expense.findMany({
        where:{
          createdAt:{
            gte:currentDate,
            lt:nextDate,
          },
          userId:user.id,
        },
        include:{
          category:true
        }
      })
      const totalExpenses = await this.getTotalExpense(req);
      return {expenses:expenses,total_expense:totalExpenses};
    }catch(e){
      throw e;
    }
  }

  private async getTotalExpense(req:Request){
    try{
      const user = getAuthUser(req);
      const expenses = await prisma.expense.findMany({
        where:{
          userId:user.id,
        },
        include:{
          category:true
        }
      })

      let total = 0;

      expenses.forEach(e=>{
        total = total + e.amount
      })

      return total;

    }catch(e){
      throw e;
    }
  }
}