import jwtMiddleWare from "../../app/middleware/auth.middleware";
import Income from '../../app/http/controllers/income.controller';
import Daybook from "../../app/http/controllers/daybook.controller";
import { validate } from "../../app/http/requests/validator";
import express from "express";
import { incomeRequest } from "../../app/http/requests/income.request";
const router = express.Router();

router.use(jwtMiddleWare);
router.get('/',Income.index);
router.get('/daybook',Daybook.income);
router.post('/store',incomeRequest(),validate,Income.store);
router.put('/update/:id',incomeRequest(),validate,Income.update);


export default router;

