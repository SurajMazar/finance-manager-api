import { CategoryController } from "../../app/http/controllers/category.controller";
import authMiddleware from '../../app/middleware/auth.middleware';
import {categoryRequest} from '../../app/http/requests/category.request';
import { validate } from "../../app/http/requests/validator";
import express from "express";
const router = express.Router();
const Catergory =  new CategoryController();

router.use(authMiddleware);
router.get('/',Catergory.index);
router.post('/store',categoryRequest(),validate,Catergory.store);
router.put('/update/:id',categoryRequest(),validate,Catergory.update);

export default router;
