import { Request, Response, NextFunction } from 'express';

import AppError from './appError';
import KnexError from './knexError';
import { HTTPStatusCode } from '../constants';

const sendError = (err: AppError, res: Response) => {
  if (err.isOperational) {
    // operational error
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // programming error
    res.status(err.statusCode).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

const handleJWTExpiredError = () =>
  new AppError(
    'Your token has expired! Please log in again.',
    HTTPStatusCode.Unauthorized
  );

const handleJWTError = () =>
  new AppError(
    'Invalid token. Please log in again!',
    HTTPStatusCode.Unauthorized
  );

const handleDuplicateFieldsDB = (err: KnexError) => {
  const message = err.sqlMessage.split(' for ')[0].trim();

  return new AppError(message, HTTPStatusCode.BadRequest);
};

const errorHandler = (
  err: AppError | KnexError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'TokenExpiredError') {
    err = handleJWTExpiredError();
  } else if (err.name === 'JsonWebTokenError') {
    err = handleJWTError();
  } else if ((err as KnexError).code === 'ER_DUP_ENTRY') {
    err = handleDuplicateFieldsDB(err as KnexError);
  }

  sendError(err, res);
};

export default errorHandler;
