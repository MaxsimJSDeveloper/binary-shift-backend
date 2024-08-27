import { Router } from 'express';
import contactsRouter from './contacts.js';

const router = Router();

router.use('/contacts', contactsRouter);
// router.use('/auth', authRouter);

export default router;
