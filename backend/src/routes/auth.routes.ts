import { Router } from 'express';
import { login, register, refresh, logout, me } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { loginSchema, registerSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);

router.post('/refresh', refresh);
router.post('/logout', logout);

router.get('/me', protect, me);

export default router;