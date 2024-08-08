import Joi from 'joi';
import { IUpdatePasswordInput } from '../../interfaces';

export default Joi.object<IUpdatePasswordInput>({
  currentPassword: Joi.string()
    .required()
    .messages({
      'any.required': 'Current password is required'
    }),
  newPassword: Joi.string()
    .min(4)
    .required()
    .messages({
      'string.min': 'New password must be at least 4 characters long',
      'any.required': 'New password is required'
    })
});
