import auth from './auth.routes';
import router from '../../utils/route.util';

router.use('/auth',auth);

export default router;