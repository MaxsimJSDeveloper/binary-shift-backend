import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import createHttpError from 'http-errors';
import { UsersCollection } from '../db/models/user.js';
import { sendEmail } from '../utils/sendMail.js';
import { TEMP_UPLOAD_DIR, SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUser = async (userId) => {
  const user = await UsersCollection.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  return user;
};

export const updateUser = async (
  userId,
  { name, email, gender, password, newPassword },
) => {
  const user = await UsersCollection.findByIdAndUpdate(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  if (password) {
    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw createHttpError(400, 'Current password is incorrect');
    }
  }

  let updatedFields = {};

  if (name) updatedFields.name = name;
  if (email) updatedFields.email = email;
  if (gender) updatedFields.gender = gender;

  if (newPassword) {
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    updatedFields.password = hashedNewPassword;
  }

  const upgradedUser = await UsersCollection.findByIdAndUpdate(
    userId,
    updatedFields,
    { new: true },
  );

  upgradedUser.password = undefined;
  return upgradedUser;
};

export const updateUserAvatar = async (userId, file) => {
  if (!file) {
    throw createHttpError(400, 'No file uploaded');
  }

  const avatarUrl = await saveFileToCloudinary(file);

  const user = await UsersCollection.findByIdAndUpdate(
    userId,
    { photo: avatarUrl },
    { new: true },
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};

export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '15m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMP_UPLOAD_DIR,
    'reset-password-email.html',
  );

  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, env('JWT_SECRET'));
    const userId = decoded.sub;

    const user = await UsersCollection.findById(userId);
    if (!user) {
      throw createHttpError(404, 'User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return user;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw createHttpError(400, 'Reset token has expired');
    }
    if (error.name === 'JsonWebTokenError') {
      throw createHttpError(400, 'Invalid token');
    }
    throw error;
  }
};
