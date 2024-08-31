import { Router } from 'express';
import waterRouter from './water.js';
import waterRateRouter from './waterRate.js';

import authRouter from './auth.js';

import userRouter from './user.js';
import monthRouter from './month.js';

const router = Router();

router.use('/water', waterRouter);
router.use('/water-rate', waterRateRouter);

router.use('/auth', authRouter);

router.use('/user', userRouter);
router.use('/month', monthRouter);

export default router;
