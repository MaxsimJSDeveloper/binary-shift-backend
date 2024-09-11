import nodemailer from 'nodemailer';
import { env } from '../utils/env.js';

import { SMTP } from '../constants/index.js';

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: env(SMTP.SMTP_HOST),
    port: Number(env(SMTP.SMTP_PORT)),
    auth: {
      user: env(SMTP.SMTP_USER),
      pass: env(SMTP.SMTP_PASSWORD),
    },
  });

  return await transporter.sendMail(options);
};
