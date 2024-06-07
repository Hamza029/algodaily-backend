import jwt from 'jsonwebtoken';

import { IAuthJWTPayload } from '../interfaces';
import { HTTPStatusCode, UserRoles } from './../constants';
import { conf } from '../config/conf';
import AppError from './appError';

const getToken = (payload: IAuthJWTPayload): string => {
  if (!conf.JWT_ACCESS_TOKEN_SECRET || !conf.JWT_EXPIRES_AFTER) {
    throw new AppError(
      'JWT information not found in server configuration',
      HTTPStatusCode.InternalServerError
    );
  }

  const token: string = jwt.sign(payload, conf.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: conf.JWT_EXPIRES_AFTER,
  });

  return token;
};

const isLoggedIn = async (
  token: string | undefined
): Promise<IAuthJWTPayload> => {
  if (!token) {
    throw new AppError(
      'Authorization header missing',
      HTTPStatusCode.Unauthorized
    );
  }

  token = token.split(' ')[1];

  if (!conf.JWT_ACCESS_TOKEN_SECRET) {
    throw new AppError(
      'JWT information not found in server configuration',
      HTTPStatusCode.InternalServerError
    );
  }

  const payload = jwt.verify(token, conf.JWT_ACCESS_TOKEN_SECRET);

  return payload as IAuthJWTPayload;
};

const authorize = async (
  token: string | undefined,
  username: string
): Promise<void> => {
  const payload: IAuthJWTPayload = await isLoggedIn(token);

  if (username !== payload.Username && payload.Role !== UserRoles.ADMIN) {
    throw new AppError(
      'You do not have permission to perform this action',
      HTTPStatusCode.Forbidden
    );
  }
};

export default {
  getToken,
  isLoggedIn,
  authorize,
};
