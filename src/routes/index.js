import { Router } from 'express';
import waterRouter from './water.js';

const router = Router();

router.use('/water', waterRouter);
// router.use('/auth', authRouter);

export default router;
