import express from 'express';
import {
  addWaterController,
  getDailyNormaController,
  getWaterController,
} from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
const parseJSON = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.get('/daily-norma', ctrlWrapper(getDailyNormaController));

router.post('/', parseJSON, ctrlWrapper(addWaterController));

router.get('/', ctrlWrapper(getWaterController));

export default router;
