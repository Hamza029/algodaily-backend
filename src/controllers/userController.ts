import { Request, Response, NextFunction } from 'express';
import { IUser } from './../interfaces';
import userService from './../services/userService';
import { parseIdParam } from '../utils/parseParam';
import sendResponse from '../utils/sendResponse';
import { IUserUpdateInput } from '../interfaces';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users: IUser[] = await userService.getAllUsers();
    sendResponse<IUser[]>(req, res, 200, 'success', 'fetched all users', users);
  } catch (err) {
    next(err);
  }
};

const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseIdParam(req);
    await userService.protect(id, req.header('Authorization'));
    next();
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseIdParam(req);

    await userService.deleteUserById(id);

    sendResponse(req, res, 200, 'deleted', `deleted user with id ${id}.`);
  } catch (err) {
    next(err);
  }
};

const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseIdParam(req);

    const user: IUser = await userService.getUserById(id);

    sendResponse<IUser>(
      req,
      res,
      200,
      'success',
      `fetched user with id ${id}`,
      user,
    );
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = parseIdParam(req);

    const userUpdateInput: IUserUpdateInput = req.body as IUserUpdateInput;

    const user: IUser = await userService.updateUserById(id, userUpdateInput);

    sendResponse<IUser>(
      req,
      res,
      200,
      'updated',
      `updated name of user with id ${id}`,
      user,
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
  protect,
};
