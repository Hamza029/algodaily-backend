import Joi from 'joi';
import { ICommentInput } from '../../interfaces';

export default Joi.object<ICommentInput>({
  content: Joi.string().required().max(500),
});
