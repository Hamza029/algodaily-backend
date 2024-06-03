import { Request, Response, NextFunction } from 'express';

import AppError from './appError';
import { conf } from '../config/conf';

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.status,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  // operational error
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: 'error',
      message: 'something went wrong',
    });
  }
};

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (conf.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (conf.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
