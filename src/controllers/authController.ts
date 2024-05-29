import { Request, Response, NextFunction } from 'express';
import authService from './../services/authService';
import { AuthInputType, UserInputType, UserType } from '../interfaces';
import sendResponse from '../utils/sendResponse';

const signup = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const userInput: UserInputType = {
            Username: req.body.Username,
            Email: req.body.Email,
            Password: req.body.Password,
            Name: req.body.Name,
        };

        const newUser: UserType = await authService.signup(userInput);

        sendResponse(
            req,
            res,
            201,
            'created',
            'successfully signed up',
            newUser
        );
    } catch (err) {
        next(err);
    }
};

const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authInput: AuthInputType = {
            Username: req.body.Username,
            Password: req.body.Password,
        };

        const loginResponse: string = await authService.login(authInput);

        sendResponse(req, res, 200, 'success', loginResponse);
    } catch (err) {
        next(err);
    }
};

export default {
    signup,
    login,
};
