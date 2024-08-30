import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getDailyNormaController,
  updateDailyNormaController,
} from '../controllers/waterRate.js';

const router = express.Router();

router.get('/daily-norma', ctrlWrapper(getDailyNormaController));

router.patch('/daily-norma', ctrlWrapper(updateDailyNormaController));

export default router;
