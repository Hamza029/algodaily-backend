import { Request, Response } from 'express';
import authService from '../../services/authService';
import authController from '../../controllers/authController';
import sendResponse from '../../utils/sendResponse';
import { IAuthLoginResponse, IProtectedRequest } from '../../interfaces';
import { HTTPStatusCode, UserRoles } from '../../constants';
import AppError from '../../utils/appError';

jest.mock('./../../services/authService', () => {
  return {
    __esModule: true,
    default: {
      signup: jest.fn(),
      login: jest.fn(),
      updateMyPassword: jest.fn(),
    },
  };
});

jest.mock('./../../utils/sendResponse', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

const mockError = new AppError('test error', HTTPStatusCode.NotImplemented);

describe('AuthController.signup', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockRequest: Partial<Request> = {
    body: {
      Username: 'a',
      Name: 'a',
      Email: 'a@gmail.com',
      Password: '1234',
    },
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  const mockLoginResponse: IAuthLoginResponse = {
    Token: 'Bearer jwt_token_demo',
  };

  it('should send response for successful signup with status 201', async () => {
    (authService.signup as jest.Mock).mockResolvedValueOnce(mockLoginResponse);

    await authController.signup(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Created,
      'successfully signed up'
    );
  });

  it('should send the error through next function', async () => {
    (authService.signup as jest.Mock).mockRejectedValueOnce(mockError);

    await authController.signup(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});

describe('AuthController.login', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockRequest: Partial<Request> = {
    body: {
      Username: 'a',
      Name: 'a',
      Email: 'a@gmail.com',
      Password: '1234',
    },
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  const mockLoginResponse: IAuthLoginResponse = {
    Token: 'Bearer jwt_token_demo',
  };

  it('should send response for successful login with status 200', async () => {
    (authService.login as jest.Mock).mockResolvedValueOnce(mockLoginResponse);

    await authController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Ok,
      'logged in',
      mockLoginResponse
    );
  });

  it('should send wrong username or password error through next function', async () => {
    const mockWrongInfoError = new AppError(
      'wrong username or password',
      HTTPStatusCode.Unauthorized
    );

    (authService.login as jest.Mock).mockRejectedValueOnce(mockWrongInfoError);

    await authController.login(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockWrongInfoError);
  });
});

describe('AuthController.updateMyPassword', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mockRequest: Partial<IProtectedRequest> = {
    body: {
      curretnPassword: '1234',
      newPassword: '5678',
    },
    user: {
      Id: 1,
      Username: 'a',
      Name: 'a',
      Email: 'a@gmail.com',
      Role: UserRoles.USER,
      JoinDate: new Date(),
    },
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  it('should send response for successful login with status 200', async () => {
    await authController.updateMyPassword(
      mockRequest as IProtectedRequest,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Ok,
      'successfully updated password'
    );
  });

  it('should send current password incorrect error through next function', async () => {
    const mockCurrentPasswordIncorrectError = new AppError(
      'Your current password is incorrect',
      HTTPStatusCode.BadRequest
    );

    (authService.updateMyPassword as jest.Mock).mockRejectedValueOnce(
      mockCurrentPasswordIncorrectError
    );

    await authController.updateMyPassword(
      mockRequest as IProtectedRequest,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockCurrentPasswordIncorrectError);
  });
});
