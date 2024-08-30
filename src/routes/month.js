import express from 'express';
import { authorize } from '../middlewares/authorize.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getMonthWaterController } from '../controllers/month.js';

const router = express.Router();
// const parseJSON = express.json({
//   type: ['application/json', 'application/vnd.api+json'],
//   limit: '100kb',
// });

router.use(authorize);

router.get('/', ctrlWrapper(getMonthWaterController));

export default router;
