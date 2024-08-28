import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import {
  registerUserController,
  loginUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = express.Router();
const parseJSON = express.json();

authRouter.post(
  '/register',
  parseJSON,
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

authRouter.post(
  '/login',
  parseJSON,
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

export default authRouter;
