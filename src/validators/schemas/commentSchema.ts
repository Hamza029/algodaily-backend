import Joi from 'joi';
import { ICommentInput } from '../../interfaces';

export default Joi.object<ICommentInput>({
  content: Joi.string().required().min(1).max(500).messages({
    'string.empty': 'Content cannot be empty',
    'any.required': 'Content is required',
    'string.min': 'Content should be at least 1 character long',
    'string.max': 'Content should not exceed 500 characters',
  }),
});
