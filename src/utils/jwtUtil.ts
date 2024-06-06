import jwt from 'jsonwebtoken';

import { IAuthJWTPayload, UserRoles } from '../interfaces';
import { conf } from '../config/conf';

const getToken = (payload: IAuthJWTPayload): string => {
  if (!conf.JWT_ACCESS_TOKEN_SECRET || !conf.JWT_EXPIRES_AFTER) {
    throw new Error('JWT info not found');
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
    throw new Error('Authentication token not found');
  }

  if (!conf.JWT_ACCESS_TOKEN_SECRET) {
    throw new Error('internal server error');
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
    throw new Error('Forbidden request');
  }
};

export default {
  getToken,
  isLoggedIn,
  authorize,
};
