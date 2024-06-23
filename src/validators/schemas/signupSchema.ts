import Joi from 'joi';
import { IUserInput } from '../../interfaces';

const schema = Joi.object<IUserInput>({
    Username: Joi.string().required(),
    Name: Joi.string().required(),
    Email: Joi.string().email().required(),
    Password: Joi.string().min(4).required(),
});

export default schema;
