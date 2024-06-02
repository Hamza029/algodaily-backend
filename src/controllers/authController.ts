import { Request, Response, NextFunction } from 'express';
import authService from './../services/authService';
import {
  IAuthInput,
  IUserInput,
  IUser,
  IAuthLoginResponse,
} from '../interfaces';
import sendResponse from '../utils/sendResponse';

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userInput: IUserInput = {
      Username: req.body.Username,
      Email: req.body.Email,
      Password: req.body.Password,
      Name: req.body.Name,
    };

    const newUser: IUser = await authService.signup(userInput);

    sendResponse<IUser>(
      req,
      res,
      201,
      'created',
      'successfully signed up',
      newUser,
    );
  } catch (err) {
    next(err);
  }
};

const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authInput: IAuthInput = {
      Username: req.body.Username,
      Password: req.body.Password,
    };

    const loginResponse: IAuthLoginResponse =
      await authService.login(authInput);
      
    sendResponse<IAuthLoginResponse>(
      req,
      res,
      200,
      'success',
      'logged in',
      loginResponse,
    );
  } catch (err) {
    next(err);
  }
};

export default {
  signup,
  login,
};
