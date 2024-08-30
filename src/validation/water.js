import Joi from 'joi';

export const waterIntakeSchema = Joi.object({
  volume: Joi.number().positive().max(500).required(),
  date: Joi.date().required(),
});

export const updateWaterIntakeSchema = Joi.object({
  volume: Joi.number().positive().max(500).required(),
  date: Joi.date().required(),
});

export const dayNormalWaterSchema = Joi.object({
  volume: Joi.number().positive().max(1500),
});
