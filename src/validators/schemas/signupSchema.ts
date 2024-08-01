import Joi from 'joi';
import { IUserInput } from '../../interfaces';

const schema = Joi.object<IUserInput>({
  username: Joi.string()
    .alphanum()
    .required()
    .messages({
      'string.alphanum': 'Username must only contain alphanumeric characters',
      'any.required': 'Username is required'
    }),
  name: Joi.string()
    .required()
    .min(1)
    .max(50)
    .messages({
      'string.empty': 'Name cannot be empty',
      'any.required': 'Name is required',
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name should not exceed 50 characters'
    }),
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.min': 'Password must be at least 4 characters long',
      'any.required': 'Password is required'
    })
});

export default schema;
