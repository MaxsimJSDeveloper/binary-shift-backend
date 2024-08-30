import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(64).required(),
  gender: Joi.string().valid('male', 'female').default('female'),
  photo: Joi.string(),
  dailyNorma: Joi.number().positive().default(1500),
});

export const updateUserValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(64),
  gender: Joi.string().valid('male', 'female').default('female'),
  photo: Joi.string(),
  dailyNorma: Joi.number().positive(),
});
