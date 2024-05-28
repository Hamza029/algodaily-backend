import { Request, Response, NextFunction } from 'express';
import authService from './../services/authService';
import { AuthInputType, UserInputType, UserType } from '../interfaces';

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

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
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

        res.status(200).json({
            status: 'success',
            message: loginResponse,
        });
    } catch (err) {
        next(err);
    }
};

export default {
    signup,
    login,
};
