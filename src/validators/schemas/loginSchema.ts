import Joi from 'joi';
import { IAuthInput } from '../../interfaces';

export default Joi.object<IAuthInput>({
  username: Joi.string()
    .alphanum()
    .required()
    .messages({
      'string.alphanum': 'Username must only contain alphanumeric characters',
      'any.required': 'Username is required'
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required'
    })
});
