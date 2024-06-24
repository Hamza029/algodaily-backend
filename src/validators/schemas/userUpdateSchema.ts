import Joi from 'joi';
import { IUserUpdateInput } from '../../interfaces';

export default Joi.object<IUserUpdateInput>({
  Name: Joi.string().required().max(30),
});
