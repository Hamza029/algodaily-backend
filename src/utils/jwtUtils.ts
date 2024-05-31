import jwt from 'jsonwebtoken';

import { IAuthJWTPayload } from '../interfaces';
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

export default {
  getToken,
};
