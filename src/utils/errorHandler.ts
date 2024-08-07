import { Request, Response, NextFunction } from 'express';

import AppError from './appError';
import KnexError from './knexError';
import { HTTPStatusCode } from '../constants';
import sendResponse from './sendResponse';

const sendError = (err: AppError, req: Request, res: Response): void => {
  if (err.logging) {
    console.error(err);
  }

  if (err.isOperational) {
    // operational error
    sendResponse(req, res, err.statusCode, err.message);
  } else {
    // programming error
    sendResponse(req, res, err.statusCode, 'Something went wrong');
  }
};

const handleJWTExpiredError = (): AppError => {
  return new AppError(
    'Your token has expired! Please log in again.',
    HTTPStatusCode.Unauthorized
  );
};

const handleJWTError = (): AppError => {
  return new AppError(
    'Invalid token. Please log in again!',
    HTTPStatusCode.Unauthorized
  );
};

const handleDuplicateFieldsDB = (err: KnexError): AppError => {
  let message;

  if (err.sqlMessage.search('User.user_email_unique') !== -1) {
    message = 'This email is already associated with an account';
  } else {
    message = 'Username is already taken';
  }

  return new AppError(message, HTTPStatusCode.BadRequest);
};

export const handleError = (
  err: AppError | KnexError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'TokenExpiredError') {
    err = handleJWTExpiredError();
  } else if (err.name === 'JsonWebTokenError') {
    err = handleJWTError();
  } else if ((err as KnexError).code === 'ER_DUP_ENTRY') {
    err = handleDuplicateFieldsDB(err as KnexError);
  }

  sendError(err, req, res);
};

export default {
  handleError,
};
