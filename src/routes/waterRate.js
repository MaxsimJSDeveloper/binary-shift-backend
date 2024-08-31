import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getDailyNormaController,
  updateDailyNormaController,
} from '../controllers/waterRate.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();
const parseJSON = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.use(authorize);

router.get('/', ctrlWrapper(getDailyNormaController));

router.put('/', parseJSON, ctrlWrapper(updateDailyNormaController));

export default router;
