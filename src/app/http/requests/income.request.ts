import {check} from 'express-validator';

export const incomeRequest = () =>{
  return [
    check('title').notEmpty().withMessage('Title is required'),
    check('amount').notEmpty().withMessage('Amount is required'),
    check('cat_id').notEmpty().withMessage('Category is required'),
  ]
}