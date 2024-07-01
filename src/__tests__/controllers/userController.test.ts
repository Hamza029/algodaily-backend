import { Request, Response } from 'express';
import userController from '../../controllers/userController';
import sendResponse from '../../utils/sendResponse';
import { IProtectedRequest, IUser, IUserResponse } from '../../interfaces';
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
    jest.resetAllMocks();
  });

  it('should return list of users with status 200', async () => {
    const mockUsersResponse: IUserResponse[] = [
      {
        Username: 'a',
        Name: 'a',
        Email: 'a@gmail.com',
        _links: {
          self: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
            method: 'GET',
          },
          update: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
            method: 'PATCH',
          },
          delete: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
            method: 'DELETE',
          },
        },
      },
      {
        Username: 'b',
        Name: 'b',
        Email: 'b@gmail.com',
        _links: {
          self: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
            method: 'GET',
          },
          update: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
            method: 'PATCH',
          },
          delete: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
            method: 'DELETE',
          },
        },
      },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValueOnce(
      mockUsersResponse
    );

    await userController.getAllUsers(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(userService.getAllUsers).toHaveBeenCalledWith(mockRequest.query);
    expect(userService.getAllUsers).toHaveReturnedWith(
      Promise.resolve(mockUsersResponse)
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      200,
      'fetched all users',
      mockUsersResponse
    );
    expect(sendResponse).toHaveBeenCalledTimes(1);

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return empty list with status 200', async () => {
    const mockRequest: Partial<Request> = {
      query: {
        page: '1000',
      },
    };

    (userService.getAllUsers as jest.Mock).mockResolvedValueOnce([]);

    await userController.getAllUsers(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(userService.getAllUsers).toHaveBeenCalledWith(mockRequest.query);
    expect(userService.getAllUsers).toHaveReturnedWith(Promise.resolve([]));

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      200,
      'fetched all users',
      []
    );
    expect(sendResponse).toHaveBeenCalledTimes(1);

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return contents of page number 1 with status 200', async () => {
    const mockRequest: Partial<Request> = {
      query: {
        page: 'abcd',
      },
    };

    const mockUsersResponse: IUserResponse[] = [
      {
        Username: 'a',
        Name: 'a',
        Email: 'a@gmail.com',
        _links: {
          self: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
            method: 'GET',
          },
          update: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
            method: 'PATCH',
          },
          delete: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
            method: 'DELETE',
          },
        },
      },
      {
        Username: 'b',
        Name: 'b',
        Email: 'b@gmail.com',
        _links: {
          self: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
            method: 'GET',
          },
          update: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
            method: 'PATCH',
          },
          delete: {
            href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
            method: 'DELETE',
          },
        },
      },
    ];

    (userService.getAllUsers as jest.Mock).mockResolvedValueOnce(
      mockUsersResponse
    );

    await userController.getAllUsers(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
    expect(userService.getAllUsers).toHaveBeenCalledWith(mockRequest.query);
    expect(userService.getAllUsers).toHaveReturnedWith(
      Promise.resolve(mockUsersResponse)
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      200,
      'fetched all users',
      mockUsersResponse
    );
    expect(sendResponse).toHaveBeenCalledTimes(1);

    expect(mockNext).not.toHaveBeenCalled();
  });
});

describe('userController.getUserById', () => {
  const mockRequest: Partial<Request> = {
    params: {
      id: 'fe32bd7f-376b-11ef-bf41-088fc319abcd',
    },
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return a user with status 200', async () => {
    const mockUserResponse: IUserResponse = {
      Name: 'a',
      Username: 'a',
      Email: 'a@gmail.com',
      _links: {
        self: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
          method: 'GET',
        },
        update: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
          method: 'PATCH',
        },
        delete: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc319abcd',
          method: 'DELETE',
        },
      },
    };

    (userService.getUserById as jest.Mock).mockResolvedValueOnce(
      mockUserResponse
    );

    await userController.getUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.getUserById).toHaveBeenCalledTimes(1);
    expect(userService.getUserById).toHaveBeenCalledWith(
      mockRequest.params!.id
    );
    expect(userService.getUserById).toHaveReturnedWith(
      Promise.resolve(mockUserResponse)
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Ok,
      `fetched user`,
      mockUserResponse
    );
    expect(sendResponse).toHaveBeenCalledTimes(1);

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return user not found error with status 404', async () => {
    const mockUserNotFoundError = new AppError(
      'User not found',
      HTTPStatusCode.NotFound
    );

    (userService.getUserById as jest.Mock).mockRejectedValueOnce(
      mockUserNotFoundError
    );

    await userController.getUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.getUserById).toHaveBeenCalledTimes(1);
    expect(userService.getUserById).toHaveBeenCalledWith(
      mockRequest.params!.id
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockUserNotFoundError);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});

describe('userController.deleteUserById', () => {
  const mockUser: IUser = {
    Id: 'fe32bd7f-376b-11ef-bf41-088fc3196e05',
    Username: 'a',
    Name: 'a',
    Email: 'a@gmail.com',
    Role: UserRoles.USER,
    JoinDate: new Date(),
  };

  const mockRequest: Partial<IProtectedRequest> = {
    params: {
      id: 'fe32bd7f-376b-11ef-bf41-088fc319abcd',
    },
    user: mockUser,
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should delete user with status 200', async () => {
    await userController.deleteUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.deleteUserById).toHaveBeenCalledTimes(1);
    expect(userService.deleteUserById).toHaveBeenCalledWith(
      mockRequest.params!.id
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Ok,
      `deleted user.`
    );
    expect(sendResponse).toHaveBeenCalledTimes(1);

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return user not found error with status 404', async () => {
    const mockUserNotFoundError = new AppError(
      'User not found',
      HTTPStatusCode.NotFound
    );

    (userService.deleteUserById as jest.Mock).mockRejectedValueOnce(
      mockUserNotFoundError
    );

    await userController.deleteUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.deleteUserById).toHaveBeenCalledTimes(1);
    expect(userService.deleteUserById).toHaveBeenCalledWith(
      mockRequest.params!.id
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockUserNotFoundError);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});

describe('userController.updateUserById', () => {
  const mockUser: IUser = {
    Id: 'fe32bd7f-376b-11ef-bf41-088fc3196e05',
    Username: 'a',
    Name: 'a',
    Email: 'a@gmail.com',
    Role: UserRoles.USER,
    JoinDate: new Date(),
  };

  const mockRequest: Partial<IProtectedRequest> = {
    params: {
      id: 'fe32bd7f-376b-11ef-bf41-088fc319abcd',
    },
    user: mockUser,
    body: {
      Name: 'b',
    },
  };
  const mockResponse: Partial<Response> = {};
  const mockNext: jest.Mock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should update user with status 200', async () => {
    const userUpdateResponseDTO: IUserResponse = {
      Username: mockUser.Username,
      Email: mockUser.Email,
      Name: mockRequest.body!.Name,
      _links: {
        self: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
          method: 'GET',
        },
        update: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
          method: 'PATCH',
        },
        delete: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
          method: 'DELETE',
        },
      },
    };

    console.log(userUpdateResponseDTO);

    (userService.updateUserById as jest.Mock).mockResolvedValueOnce(
      userUpdateResponseDTO
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
      _links: {
        self: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
          method: 'GET',
        },
        update: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
          method: 'PATCH',
        },
        delete: {
          href: '/api/blogs/ab32bd7f-376b-11ef-bf41-088fc3196e05',
          method: 'DELETE',
        },
      },
    };

    expect(userService.updateUserById).toHaveBeenCalledTimes(1);
    expect(userService.updateUserById).toHaveBeenCalledWith(
      mockRequest.params!.id,
      mockRequest.body
    );
    expect(userService.updateUserById).toHaveReturnedWith(
      Promise.resolve(updatedUser)
    );

    expect(sendResponse).toHaveBeenCalledWith(
      mockRequest,
      mockResponse,
      HTTPStatusCode.Ok,
      `updated name of user`,
      updatedUser
    );
    expect(sendResponse).toHaveBeenCalledTimes(1);

    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return unexpected error with status 200', async () => {
    const mockUnexpectedError = new AppError(
      'An unexpected error occurred while updating user',
      HTTPStatusCode.InternalServerError
    );

    (userService.updateUserById as jest.Mock).mockRejectedValueOnce(
      mockUnexpectedError
    );

    await userController.updateUserById(
      mockRequest as Request,
      mockResponse as Response,
      mockNext
    );

    expect(userService.updateUserById).toHaveBeenCalledTimes(1);
    expect(userService.updateUserById).toHaveBeenCalledWith(
      mockRequest.params!.id,
      mockRequest.body
    );

    expect(sendResponse).not.toHaveBeenCalled();

    expect(mockNext).toHaveBeenCalledWith(mockUnexpectedError);
    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
