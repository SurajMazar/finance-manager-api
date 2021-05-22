
import { Request, Response } from 'express';
import { formatResponse } from '../../../utils/response.util';
import {IncomeRepository} from '../../repositories/income/income.repository'


const Income = new IncomeRepository();

class IncomeController{
  async store(req:Request,res:Response){
    try{
      const income = await Income.store(req);
      res.status(200).json(formatResponse(income,true));
    }catch(e){
      res.status(500).json(formatResponse(e,false))
    }
  }
}


const IC = new IncomeController();

export default IC;