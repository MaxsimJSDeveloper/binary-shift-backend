import express from 'express';
import ctrlWrapper from '../utils/ctrlWrapper';
import { registerUserSchema } from '../validation/auth';
import { registerUserController } from '../controllers/auth';
import { validateBody } from '../middlewares/validateBody';


const router = express.Router();
const parseJSON = express.json();

router.post(
  '/register',
  parseJSON,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;
