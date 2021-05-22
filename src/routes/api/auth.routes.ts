import { AuthController } from "../../app/http/controllers/auth.controller";
import router from '../../utils/route.util';

const Auth = new AuthController();

router.post('/login',Auth.login);



export default router;


