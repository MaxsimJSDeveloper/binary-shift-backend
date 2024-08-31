import express from 'express';
import { authorize } from '../middlewares/authorize.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { todayWaterController } from '../controllers/today.js';

const router = express.Router();

router.use(authorize);

router.get('/', ctrlWrapper(todayWaterController));

export default router;