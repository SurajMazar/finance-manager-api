import jwtMiddleWare from "../../app/middleware/auth.middleware";
import Expense from '../../app/http/controllers/expenses.controller';
import { validate } from "../../app/http/requests/validator";
import express from "express";
import { incomeRequest } from "../../app/http/requests/income.request";
const router = express.Router();

router.use(jwtMiddleWare);
router.get('/',Expense.index);
router.post('/store',incomeRequest(),validate,Expense.store);
router.put('/update/:id',incomeRequest(),validate,Expense.update);


export default router;

