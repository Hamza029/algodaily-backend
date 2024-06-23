import { Request, Response, NextFunction } from "express";
import Joi, { Err } from "joi";
import signupSchema from './schemas/signupSchema';
import loginSchema from "./schemas/loginSchema";
import userUpdateSchema from "./schemas/userUpdateSchema";
import blogSchema from "./schemas/blogSchema";
import blogUpdateSchema from "./schemas/blogUpdateSchema";
import { IProtectedRequest } from "../interfaces";
import AppError from "../utils/appError";
import { HTTPStatusCode } from "../constants";

type ValidatorType = 'signup' | 'login' | 'user_update' | 'create_blog' | 'blog_update';

const validator: Record<ValidatorType, Joi.ObjectSchema> = {
    signup: signupSchema,
    login: loginSchema,
    user_update: userUpdateSchema,
    create_blog: blogSchema,
    blog_update: blogUpdateSchema,
}

export default (validatorType: ValidatorType) => {
    const schema = validator[validatorType];

    return async function (req: Request | IProtectedRequest, res: Response, next: NextFunction) {
        try {
            await schema.validateAsync(req.body, {abortEarly: false, allowUnknown: false});
            next();
        } catch (err) {
            const msg = (err as Error).message.replace(/"/g, "'");
            next(new AppError(msg, HTTPStatusCode.BadRequest));
        }
    }
}
