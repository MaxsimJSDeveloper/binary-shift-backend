import express from 'express';
import { authorize } from '../middlewares/authorize.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getMonthWaterController } from '../controllers/month.js';

const router = express.Router();

router.use(authorize);

router.get('/', ctrlWrapper(getMonthWaterController));

export default router;
