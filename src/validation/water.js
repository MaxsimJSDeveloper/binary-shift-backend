import Joi from 'joi';

export const waterRecordSchema = Joi.object({
  date: Joi.date().required().messages({
    'date.base': 'Date should be a valid date',
    'any.required': 'Date is required',
  }),
  volume: Joi.number().min(0).required().messages({
    'number.base': 'Volume should be a number',
    'number.min': 'Volume should be at least 0',
    'any.required': 'Volume is required',
  }),
  userId: Joi.string().required().messages({
    'string.base': 'User ID should be a string',
    'any.required': 'User ID is required',
  }),
});
