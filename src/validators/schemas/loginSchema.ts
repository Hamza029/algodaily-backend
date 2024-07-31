import Joi from 'joi';
import { IAuthInput } from '../../interfaces';

export default Joi.object<IAuthInput>({
  username: Joi.string().alphanum().required(),
  password: Joi.string().required(),
});
