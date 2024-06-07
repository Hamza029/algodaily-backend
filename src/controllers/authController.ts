import { Request, Response, NextFunction } from 'express';
import authService from './../services/authService';
import { IUser, IAuthLoginResponse } from '../interfaces';
import sendResponse from '../utils/sendResponse';

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requestBody = { ...req.body };
    await authService.signup(requestBody);

    sendResponse<IUser>(req, res, 201, 'successfully signed up');
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
    const requestBody = { ...req.body };

    const loginResponse: IAuthLoginResponse =
      await authService.login(requestBody);

    sendResponse<IAuthLoginResponse>(req, res, 200, 'logged in', loginResponse);
  } catch (err) {
    next(err);
  }
};

export default {
  signup,
  login,
};
