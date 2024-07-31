import Joi from 'joi';
import { IUserInput } from '../../interfaces';

const schema = Joi.object<IUserInput>({
  username: Joi.string().alphanum().required(),
  name: Joi.string().required().max(30),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required(),
});

export default schema;
