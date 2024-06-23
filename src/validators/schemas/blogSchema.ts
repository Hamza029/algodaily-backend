import Joi from "joi";
import { IBlogInput } from "../../interfaces";

export default Joi.object<IBlogInput>({
    title: Joi.string().required(),
    description: Joi.string().required(),
});
