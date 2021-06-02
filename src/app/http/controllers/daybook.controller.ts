import { Request, Response } from 'express';
import { formatResponse } from '../../../utils/response.util';
import {ExpensesRepository} from '../../repositories/expenses/expenses.repository';
import {IncomeRepository} from '../../repositories/income/income.repository';



const Income = new IncomeRepository();
const Expense = new ExpensesRepository();

class DaybookController {

  async income(req:Request,res:Response){
    try{
      const incomes = await Income.getByDate(req);
      res.status(200).json(formatResponse(incomes,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }


  async expense(req:Request,res:Response){
    try{
      const expenses = await Expense.getByDate(req);
      res.status(200).json(formatResponse(expenses,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false));
    }
  }

}


const Daybook = new DaybookController();

export default Daybook;