import Joi from 'joi';
import { IBlogUpdateInput } from '../../interfaces';

export default Joi.object<IBlogUpdateInput>({
  title: Joi.string()
    .min(10)
    .max(300)
    .messages({
      'string.min': 'Title should be at least 10 characters long',
      'string.max': 'Title should not exceed 300 characters'
    }),
  description: Joi.string()
    .min(10)
    .max(1500)
    .messages({
      'string.min': 'Description should be at least 10 characters long',
      'string.max': 'Description should not exceed 1500 characters'
    })
})
  .or('title', 'description')
  .messages({
    'object.missing': 'At least one of Title or Description must be provided'
  });
