import { AuthController } from "../../app/http/controllers/auth.controller";
import router from '../../utils/route.util';
import authMiddleware from '../../app/middleware/auth.middleware';

const Auth = new AuthController();

router.post('/login',Auth.login);
router.get('/profile',authMiddleware,Auth.profile);

export default router;


