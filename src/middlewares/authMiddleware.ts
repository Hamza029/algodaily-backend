import { Response, NextFunction } from 'express';
import { IAuthJWTPayload, IUser, IProtectedRequest } from '../interfaces';
import userRepository from '../repository/userRepository';
import jwtUtil from '../utils/jwtUtil';

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

export default {
  authenticate,
};
