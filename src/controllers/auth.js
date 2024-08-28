import { registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'User successfully registered!',
    data: {
      id: user._id,
      email: user.email,
    },
  });
};
