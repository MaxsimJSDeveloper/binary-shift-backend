import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getWaterRecordsController,
  getWaterRecordByIdController,
  createWaterRecordController,
  updateWaterRecordController,
  deleteWaterRecordController,
} from '../controllers/water.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { waterRecordSchema } from '../validation/water.js';

const router = express.Router();
const parseJSON = express.json();

// Отримати всі записи води з можливістю пагінації
router.get('/', authenticate, ctrlWrapper(getWaterRecordsController));

// Отримати запис води за ID
router.get('/:id', authenticate, ctrlWrapper(getWaterRecordByIdController));

// Створити новий запис води
router.post(
  '/',
  authenticate,
  parseJSON,
  validateBody(waterRecordSchema),
  ctrlWrapper(createWaterRecordController),
);

// Оновити існуючий запис води за ID
router.put(
  '/:id',
  authenticate,
  parseJSON,
  validateBody(waterRecordSchema),
  ctrlWrapper(updateWaterRecordController),
);

// Видалити запис води за ID
router.delete('/:id', authenticate, ctrlWrapper(deleteWaterRecordController));

export default router;
