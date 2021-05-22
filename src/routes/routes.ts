import api from './api/index.routes';
import express from "express";
const router = express.Router();

router.use('/api',api);


export default router;


