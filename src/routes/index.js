import { Router } from 'express';
import waterRouter from './water.js';
import authRouter from './auth.js';
import monthRouter from './month.js';

const router = Router();

router.use('/water', waterRouter);
router.use('/auth', authRouter);
router.use('/month', monthRouter);

export default router;
