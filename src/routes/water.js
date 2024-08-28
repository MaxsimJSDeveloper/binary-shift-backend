import express from 'express';
import { getWaterInfoController } from '../controllers/water.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();
// const parseJSON = express.json({
//   type: ['application/json', 'application/vnd.api+json'],
//   limit: '100kb',
// });

router.get('/', ctrlWrapper(getWaterInfoController));

export default router;
