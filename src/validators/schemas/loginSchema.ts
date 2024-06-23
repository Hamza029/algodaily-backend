import Joi from 'joi';
import { IAuthInput } from '../../interfaces';

export default Joi.object<IAuthInput>({
    Username: Joi.string().required(),
    Password: Joi.string().required(),
});
