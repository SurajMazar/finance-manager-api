import router from '../../utils/route.util';
import auth from './auth.routes';

router.use('auth',auth);

export default router;