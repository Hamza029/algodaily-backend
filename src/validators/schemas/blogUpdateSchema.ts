import Joi from 'joi';
import { IBlogUpdateInput } from '../../interfaces';

export default Joi.object<IBlogUpdateInput>({
  title: Joi.string().required().max(100),
  description: Joi.string().required(),
});
