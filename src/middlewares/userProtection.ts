import { Response, NextFunction } from 'express';
import { HTTPStatusCode } from '../constants';
import { IAuthJWTPayload, IUser, IProtectedRequest } from '../interfaces';
import userRepository from '../repository/userRepository';
import AppError from '../utils/appError';
import jwtUtil from '../utils/jwtUtil';
import { parseIdParam } from '../utils/parseParam';

const authenticate = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined = req.header('Authorization');

    const payload: IAuthJWTPayload = await jwtUtil.authenticate(token);

    const currentUser: IUser | undefined =
      await userRepository.getUserByUsername(payload.Username);

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

const authorize = async (
  req: IProtectedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseIdParam(req);

    const user: IUser | undefined = await userRepository.getUserById(id);

    if (!user) {
      return next(
        new AppError(
          "The requested user doesn't exist",
          HTTPStatusCode.NotFound
        )
      );
    }

    if (!req.user) {
      return next(
        new AppError(
          "The user of this token doesn't exist",
          HTTPStatusCode.NotFound
        )
      );
    }

    jwtUtil.authorize(req.user, user.Username);
    next();
  } catch (err) {
    next(err);
  }
};

export default {
  authenticate,
  authorize,
};
