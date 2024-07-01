class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  logging: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`[0] === '4' ? 'fail' : 'error';
    this.isOperational = true;
    this.logging = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
