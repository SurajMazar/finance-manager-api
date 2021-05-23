
import { Request, Response } from 'express';
import { formatResponse } from '../../../utils/response.util';
import {IncomeRepository} from '../../repositories/income/income.repository'


const Income = new IncomeRepository();

class IncomeController{


  async index(req:Request,res:Response){
    try{
      const incomes = await Income.index(req);
      res.status(200).json(formatResponse(incomes,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false))
    }
  }

  async store(req:Request,res:Response){
    try{
      const income = await Income.store(req);
      res.status(200).json(formatResponse(income,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false))
    }
  }

  async update(req:Request,res:Response){
    try{
      const income = await Income.update(req);
      res.status(200).json(formatResponse(income,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false))
    }
  }
  
}


const IC = new IncomeController();

export default IC;