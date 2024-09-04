import express from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authorize } from '../middlewares/authorize.js';
import { upload } from '../middlewares/multer.js';
import { isValidId } from '../middlewares/isValidId.js';

import {
  requestResetEmailController,
  resetPasswordController,
  updateUserController,
  updateUserAvatarController,
  getUserController,
} from '../controllers/user.js';
import {
  updateUserValidationSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/user.js';

const router = express.Router();
const parseJSON = express.json({
  type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
});

router.use(authorize);

router.get('/', authorize, ctrlWrapper(getUserController));

router.patch(
  '/',
  authorize,
  parseJSON,
  validateBody(updateUserValidationSchema),
  ctrlWrapper(updateUserController),
);

router.patch(
  '/avatar',
  authorize,
  parseJSON,
  isValidId,
  upload.single('avatar'),
  ctrlWrapper(updateUserAvatarController),
);

router.post(
  '/request-reset-email',
  parseJSON,
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  parseJSON,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
