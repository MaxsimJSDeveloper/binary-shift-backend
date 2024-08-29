import express from 'express';
import {
  addWaterController,
  deleteWaterController,
  getDailyNormaController,
  getWaterController,
  updateWaterController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const parseJSON = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/daily-norma', ctrlWrapper(getDailyNormaController));

// router.put('/daily-norma', ctrlWrapper(updateDailyNormaController));

router.post('/', parseJSON, ctrlWrapper(addWaterController));

router.get('/', ctrlWrapper(getWaterController));

router.patch('/:id', parseJSON, ctrlWrapper(updateWaterController));

router.delete('/:id', ctrlWrapper(deleteWaterController));

export default router;
