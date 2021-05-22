import { AuthController } from "../../app/http/controllers/auth.controller";
import authMiddleware from '../../app/middleware/auth.middleware';
import express from "express";
const router = express.Router();

const Auth = new AuthController();

router.post('/login',Auth.login);
router.get('/profile',authMiddleware,Auth.profile);

export default router;


