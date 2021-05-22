import auth from './auth.routes';
import category from './category.routes';
import income from './income.routes';
import express from "express";
const router = express.Router();

router.use('/auth',auth);
router.use('/category',category);
router.use('/income',income);

export default router;