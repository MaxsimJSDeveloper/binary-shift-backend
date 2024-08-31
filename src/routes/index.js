import { Router } from 'express';
import waterRouter from './water.js';
import authRouter from './auth.js';

import userRouter from './user.js'
import monthRouter from './month.js';

import todayRouter from './today.js';

const router = Router();

router.use('/water', waterRouter);
router.use('/auth', authRouter);

router.use('/user', userRouter);
router.use('/month', monthRouter);

router.use('/today', todayRouter);

export default router;
