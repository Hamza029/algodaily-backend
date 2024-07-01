import { Request, Response, NextFunction } from 'express';
import { IProtectedRequest, IUserResponse } from './../interfaces';
import userService from './../services/userService';
import sendResponse from '../utils/sendResponse';
import { HTTPStatusCode } from '../constants';

// No hardcoded status code
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: IUserResponse[] = await userService.getAllUsers({
      ...req.query,
    });
    sendResponse<IUserResponse[]>(
      req,
      res,
      HTTPStatusCode.Ok,
      'fetched all users',
      users
    );
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.deleteUserById(req.params.id);

    sendResponse(req, res, HTTPStatusCode.Ok, `deleted user.`);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user: IUserResponse = await userService.getUserById(req.params.id);

    sendResponse<IUserResponse>(
      req,
      res,
      HTTPStatusCode.Ok,
      `fetched user`,
      user
    );
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const requestBody = { ...req.body };

    const user: IUserResponse = await userService.updateUserById(
      req.params.id,
      requestBody
    );

    sendResponse<IUserResponse>(
      req,
      res,
      HTTPStatusCode.Ok,
      `updated name of user`,
      user
    );
  } catch (err) {
    next(err);
  }
};

export default {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
};
