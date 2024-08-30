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
} from '../controllers/user';
import { updateUserValidationSchema, userValidationSchema } from '../validation/user';

const router = express.Router();
const parseJSON = express.json({
    type: ['application/json', 'application/vnd.api+json'],
    limit: '100kb',
  });

  router.use(authorize);

router.post('/',
parseJSON,
upload.single('photo'),
validateBody(userValidationSchema),
ctrlWrapper(updateUserController)
);

router.patch(
    '/:userId',
    parseJSON,
    upload.single('photo'),
    isValidId,
    validateBody(updateUserValidationSchema),
    ctrlWrapper(updateUserAvatarController),
  );

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
