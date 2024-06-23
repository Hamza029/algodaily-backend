import Joi from "joi";
import { IBlogUpdateInput } from "../../interfaces";

export default Joi.object<IBlogUpdateInput>({
    title: Joi.string().required(),
    description: Joi.string().required(),
});
