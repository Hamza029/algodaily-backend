import Joi from 'joi';
import { IUserUpdateInput } from '../../interfaces';

export default Joi.object<IUserUpdateInput>({
  name: Joi.string().max(30),
})
  .or('name')
  .required();
