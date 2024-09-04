import {
  getUser,
  updateUser,
  updateUserAvatar,
  requestResetToken,
  resetPassword,
} from '../services/user.js';

export const getUserController = async (req, res) => {
  const user = await getUser(req.user._id);
  res.json({
    status: 200,
    data: user,
  });
};

export const updateUserController = async (req, res) => {
  const updatedUser = await updateUser(req.user._id, req.body);

  console.log('Request body:', req.body); // Логування тіла запиту
  console.log('User ID:', req.user._id); // Логування ID користувача

  res.json({
    message: 'User information updated successfully!',
    status: 200,
    data: updatedUser,
  });
};

export const updateUserAvatarController = async (req, res) => {
  const updatedUser = await updateUserAvatar(req.user._id, req.file);
  res.json({
    message: 'User avatar updated successfully!',
    status: 200,
    data: updatedUser,
  });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body.token, req.body.password);
  res.json({
    message: 'Password reset successfully!',
    status: 200,
    data: {},
  });
};
