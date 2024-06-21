import { Request, Response } from 'express';
import userController from '../../controllers/userController';
import sendResponse from '../../utils/sendResponse';
import {
  IProtectedRequest,
  IUser,
  IUserResponse,
  IUserUpdateInput,
} from '../../interfaces';
import userService from '../../services/userService';
import AppError from '../../utils/appError';
import { HTTPStatusCode, UserRoles } from '../../constants';

jest.mock('./../../services/userService', () => {
  return {
    __esModule: true,
    default: {
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      deleteUserById: jest.fn(),
      updateUserById: jest.fn(),
    },
  };
});

jest.mock('./../../utils/sendResponse', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe('userController.getAllUsers', () => {
  const mockRequest: Partial<Request> = {
    query: {
      page: '2',
    },
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of users with status 200', async () => {
    const mockUsersResponse: IUserResponse[] = [
      { Username: 'a', Name: 'a', Email: 'a@gmail.com' },
      { Username: 'b', Name: 'b', Email: 'b@gmail.com' },
    ];

    (userService.getAllUsers as jest.Mock).mockImplementationOnce(
      async (): Promise<IUserResponse[]> => mockUsersResponse
    );

    await userController.getAllUsers(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.getAllUsers).toHaveBeenCalled();

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      200,
      'fetched all users',
      mockUsersResponse
    );

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return no user found error with status 404', async () => {
    const mockUserNotFoundError = new AppError(
      'User not found',
      HTTPStatusCode.NotFound
    );

    (userService.getAllUsers as jest.Mock).mockImplementationOnce(
      async (): Promise<IUserResponse[]> => {
        throw mockUserNotFoundError;
      }
    );

    await userController.getAllUsers(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockUserNotFoundError);
  });

  it('should return invalid page number error with status 400', async () => {
    const mockBadRequest: Partial<Request> = {
      query: {
        page: 'abcd',
      },
    };

    const mockBadRequestError = new AppError(
      'Invalid page number',
      HTTPStatusCode.BadRequest
    );

    (userService.getAllUsers as jest.Mock).mockImplementationOnce(
      async (): Promise<IUserResponse[]> => {
        throw mockBadRequestError;
      }
    );

    await userController.getAllUsers(
      mockBadRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockBadRequestError);
  });
});

describe('userController.getUserById', () => {
  const mockRequest: Partial<Request> = {
    params: {
      id: '1',
    },
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user with status 200', async () => {
    const mockUserResponse: IUserResponse = {
      Name: 'a',
      Username: 'a',
      Email: 'a@gmail.com',
    };

    (userService.getUserById as jest.Mock).mockImplementationOnce(
      async (_id: number): Promise<IUserResponse> => {
        return mockUserResponse;
      }
    );

    await userController.getUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Ok,
      `fetched user with id ${mockRequest.params!.id}`,
      mockUserResponse
    );

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return user not found error with status 404', async () => {
    const mockUserNotFoundError = new AppError(
      'User not found',
      HTTPStatusCode.NotFound
    );

    (userService.getUserById as jest.Mock).mockImplementationOnce(
      (): Promise<IUserResponse> => {
        throw mockUserNotFoundError;
      }
    );

    await userController.getUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockUserNotFoundError);
  });
});

describe('userController.deleteUserById', () => {
  const mockUser: IUser = {
    Id: 1,
    Username: 'a',
    Name: 'a',
    Email: 'a@gmail.com',
    Role: UserRoles.USER,
    JoinDate: new Date(),
  };

  const mockRequest: Partial<IProtectedRequest> = {
    params: {
      id: '1',
    },
    user: mockUser,
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete user with status 200', async () => {
    (userService.deleteUserById as jest.Mock).mockImplementationOnce(
      async (_id: number): Promise<void> => {}
    );

    await userController.deleteUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Ok,
      `deleted user with id ${mockUser.Id}.`
    );

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return user not found error with status 404', async () => {
    const mockUserNotFoundError = new AppError(
      'User not found',
      HTTPStatusCode.NotFound
    );

    (userService.deleteUserById as jest.Mock).mockImplementationOnce(
      async (_id: number): Promise<void> => {
        throw mockUserNotFoundError;
      }
    );

    await userController.deleteUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockUserNotFoundError);
  });
});

describe('userController.updateUserById', () => {
  const mockUser: IUser = {
    Id: 1,
    Username: 'a',
    Name: 'a',
    Email: 'a@gmail.com',
    Role: UserRoles.USER,
    JoinDate: new Date(),
  };

  const mockRequest: Partial<IProtectedRequest> = {
    params: {
      id: '1',
    },
    user: mockUser,
    body: {
      Name: 'b',
    },
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update user with status 200', async () => {
    (userService.updateUserById as jest.Mock).mockImplementationOnce(
      async (
        _id: number,
        userUpdateInput: IUserUpdateInput
      ): Promise<IUserResponse> => {
        const { Username, Email } = mockUser;
        const { Name } = userUpdateInput;
        const userUpdateResponseDTO: IUserResponse = {
          Username,
          Email,
          Name,
        };
        return userUpdateResponseDTO;
      }
    );

    await userController.updateUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    const updatedUser: IUserResponse = {
      Name: mockRequest.body.Name,
      Email: mockUser.Email,
      Username: mockUser.Username,
    };

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Ok,
      `updated name of user with id ${mockRequest.params!.id}`,
      updatedUser
    );

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return unexpected error with status 200', async () => {
    const mockUnexpectedError = new AppError(
      'An unexpected error occurred while updating user',
      HTTPStatusCode.InternalServerError
    );

    (userService.updateUserById as jest.Mock).mockImplementationOnce(
      async (
        _id: number,
        _userUpdateInput: IUserUpdateInput
      ): Promise<IUserResponse> => {
        throw mockUnexpectedError;
      }
    );

    await userController.updateUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockUnexpectedError);
  });
});
