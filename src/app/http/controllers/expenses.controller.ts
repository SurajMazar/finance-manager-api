
import { Request, Response } from 'express';
import { formatResponse } from '../../../utils/response.util';
import {ExpensesRepository} from '../../repositories/expenses/expenses.repository'


const Expenses = new ExpensesRepository();

class IncomeController{


  async index(req:Request,res:Response){
    try{
      const expenses = await Expenses.index(req);
      res.status(200).json(formatResponse(expenses,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false))
    }
  }

  async store(req:Request,res:Response){
    try{
      const expense = await Expenses.store(req);
      res.status(200).json(formatResponse(expense,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false))
    }
  }

  async update(req:Request,res:Response){
    try{
      const expense = await Expenses.update(req);
      res.status(200).json(formatResponse(expense,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false))
    }
  }
  
}


const IC = new IncomeController();

export default IC;