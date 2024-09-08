import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  updateWaterRateController,
  getDailyNormaController,
} from '../controllers/waterRate.js';
import { authorize } from '../middlewares/authorize.js';
import { validateBody } from '../middlewares/validateBody.js';
import { dailyNormaWaterSchema } from '../validation/water.js';

const router = express.Router();
const parseJSON = express.json();

router.use(authorize);

router.get('/', authorize, parseJSON, ctrlWrapper(getDailyNormaController));

router.put(
  '/',
  parseJSON,
  validateBody(dailyNormaWaterSchema),
  ctrlWrapper(updateWaterRateController),
);

export default router;
