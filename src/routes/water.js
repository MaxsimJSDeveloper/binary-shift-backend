import express from 'express';
import {
  addWaterController,
  deleteWaterController,
  updateWaterController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authorize } from '../middlewares/authorize.js';
import {
  updateWaterIntakeSchema,
  waterIntakeSchema,
} from '../validation/water.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = express.Router();
const parseJSON = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.use(authorize);

// router.get('/daily-norma', ctrlWrapper(getDailyNormaController));

// router.put('/daily-norma', ctrlWrapper(updateDailyNormaController));

router.post(
  '/',
  parseJSON,
  validateBody(waterIntakeSchema),
  ctrlWrapper(addWaterController),
);

router.patch(
  '/:id',
  parseJSON,
  validateBody(updateWaterIntakeSchema),
  ctrlWrapper(updateWaterController),
);

router.delete('/:id', ctrlWrapper(deleteWaterController));

export default router;
