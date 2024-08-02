import Joi from 'joi';
import { IBlogInput } from '../../interfaces';

export default Joi.object<IBlogInput>({
  title: Joi.string().required().min(10).max(300).messages({
    'string.empty': 'Title cannot be empty',
    'any.required': 'Title is required',
    'string.min': 'Title should be at least 10 characters long',
    'string.max': 'Title should not exceed 300 characters',
  }),
  description: Joi.string().required().min(10).max(1500).messages({
    'string.empty': 'Description cannot be empty',
    'any.required': 'Description is required',
    'string.min': 'Description should be at least 10 characters long',
    'string.max': 'Description should not exceed 300 characters',
  }),
});
