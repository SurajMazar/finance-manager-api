import jwtMiddleWare from "../../app/middleware/auth.middleware";
import Income from '../../app/http/controllers/income.controller';
import { validate } from "../../app/http/requests/validator";
import express from "express";
import { incomeRequest } from "../../app/http/requests/income.request";
const router = express.Router();

router.use(jwtMiddleWare);
router.post('/store',incomeRequest(),validate,Income.store);


export default router;

