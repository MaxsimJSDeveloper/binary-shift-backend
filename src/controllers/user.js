import {
  updateUser,
  updateUserAvatar,
  requestResetToken,
  resetPassword,
} from '../services/user.js';

export const updateUserController = async (req, res, next) => {
  try {
    const updatedUser = await updateUser(req.user._id, req.body);
    res.json({
      message: 'User information updated successfully!',
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatarController = async (req, res, next) => {
  try {
    const updatedUser = await updateUserAvatar(req.user._id, req.body.photo);
    res.json({
      message: 'User avatar updated successfully!',
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
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
