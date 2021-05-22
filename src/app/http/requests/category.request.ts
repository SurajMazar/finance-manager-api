import {check} from 'express-validator';

export const categoryRequest = () =>{
  return [
    check('name').notEmpty().withMessage('Name is required'),
    check('type').notEmpty().withMessage('Type is required'),
  ]
}