import Joi from 'joi';

export const waterIntakeSchema = Joi.object({
  amount: Joi.number().positive().max(500).required(),
  date: Joi.date().required(),
})

export const updateWaterIntakeSchema = Joi.object({
  amount: Joi.number().positive().max(500).required(),
  date: Joi.date().required(),
})

export const dayNormalWaterSchema = Joi.object({
  amount: Joi.number().positive().max(1500),
})