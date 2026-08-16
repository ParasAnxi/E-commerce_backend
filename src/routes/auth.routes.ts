import express from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { validate } from '../middleware/validate.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { authRateLimiter } from '../middleware/rateLimiter';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', authRateLimiter, validate(loginSchema), login);
router.post('/logout', logout);

router.get('/me', authenticate, (req, res) => {
    res.json({ user: (req as any).user });
});

export default router;
