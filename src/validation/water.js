import Joi from 'joi';

export const waterIntakeSchema = Joi.object({
  volume: Joi.number().positive().max(5000).required(),
  date: Joi.date().required(),
});

export const updateWaterIntakeSchema = Joi.object({
  volume: Joi.number().positive().max(5000),
  date: Joi.date(),
});

export const dayNormalWaterSchema = Joi.object({
  volume: Joi.number().positive().max(15000),
});
