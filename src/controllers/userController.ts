import { Request, Response, NextFunction } from 'express';
<<<<<<< HEAD
import { IProtectedRequest, IUser, IUserResponse } from './../interfaces';
=======
import { IUserResponse } from './../interfaces';
>>>>>>> 8a0076fe7d73578ee401549b30b9c688bc6c3305
import userService from './../services/userService';
import { parseIdParam } from '../utils/parseParam';
import sendResponse from '../utils/sendResponse';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: IUserResponse[] = await userService.getAllUsers();
    sendResponse<IUserResponse[]>(req, res, 200, 'fetched all users', users);
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
    const id = parseIdParam(req);

    await userService.deleteUserById(id);

    sendResponse(req, res, 200, `deleted user with id ${id}.`);
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
    const id = parseIdParam(req);

    const user: IUserResponse = await userService.getUserById(id);

    sendResponse<IUserResponse>(
      req,
      res,
      200,
      `fetched user with id ${id}`,
      user
    );
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseIdParam(req);

    const requestBody = { ...req.body };

    const user: IUserResponse = await userService.updateUserById(
      id,
      requestBody
    );

    sendResponse<IUserResponse>(
      req,
      res,
      200,
      `updated name of user with id ${id}`,
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
