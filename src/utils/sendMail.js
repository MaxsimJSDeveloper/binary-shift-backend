import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: SMTP.SMTP_HOST,
    port: Number(SMTP.SMTP_PORT),
    auth: {
      user: SMTP.SMTP_USER,
      pass: SMTP.SMTP_PASSWORD,
    },
  });

  return await transporter.sendMail(options);
};
