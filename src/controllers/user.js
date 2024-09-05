import {
  getUser,
  updateUser,
  updateUserAvatar,
  requestResetToken,
  resetPassword,
} from '../services/user.js';

export const getUserController = async (req, res) => {
  const user = await getUser(req.user._id);
  res.status(200).json({ user });
};

export const updateUserController = async (req, res) => {
  const updatedUser = await updateUser(req.user._id, req.body);
  res
    .status(200)
    .json({ message: 'Profile updated successfully', user: updatedUser });
};

export const updateUserAvatarController = async (req, res) => {
  const updatedUser = await updateUserAvatar(req.user._id, req.file);
  res
    .status(200)
    .json({ message: 'Avatar updated successfully', user: updatedUser });
};

export const requestResetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);
  res.status(200).json({ message: 'Reset password email sent' });
};

export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body.token, req.body.password);
  res.status(200).json({ message: 'Password reset successfully' });
};
