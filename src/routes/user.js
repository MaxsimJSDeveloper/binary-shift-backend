import express from 'express';
import { validateBody } from '../middlewares/validateBody';
import { ctrlWrapper } from '../utils/ctrlWrapper';
import { authorize } from '../middlewares/authorize';
import { upload } from '../middlewares/multer';
import { isValidId } from '../middlewares/isValidId.js';

import {
  requestResetEmailController,
  requestResetEmailSchema,
  resetPasswordSchema,
  resetPasswordController,
  updateUserController,
  updateUserAvatarController,
  getUserController
} from '../controllers/user';
import { updateUserValidationSchema } from '../validation/user';

const router = express.Router();
const parseJSON = express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  });

  router.use(authorize);


router.get('/', authorize, ctrlWrapper(getUserController));

router.patch(
  '/userId',
  parseJSON,
  authorize,
  validateBody(updateUserValidationSchema),
  ctrlWrapper(updateUserController)
);

router.patch(
  '/avatar',
  authorize,
  parseJSON,
  upload.single('avatar'),
  ctrlWrapper(updateUserAvatarController)
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
