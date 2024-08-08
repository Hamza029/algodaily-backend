import Joi from 'joi';
import { IUserUpdateInput } from '../../interfaces';

export default Joi.object<IUserUpdateInput>({
  name: Joi.string()
    .min(1)
    .max(50)
    .messages({
      'string.min': 'Name must be at least 1 character long',
      'string.max': 'Name should not exceed 50 characters'
    })
})
  .or('name')
  .messages({
    'object.missing': 'At least one field must be provided'
  })
  .required();
