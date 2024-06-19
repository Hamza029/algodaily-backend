import { HTTPStatusCode, UserRoles } from '../../constants';
import { IUser, IUserQueryParams, IUserResponse } from '../../interfaces';
import userRepository from '../../repository/userRepository';
import { UserResponseDTO } from '../../services/dtos/user.dto';
import userService from '../../services/userService';
import AppError from '../../utils/appError';

jest.mock('./../../repository/userRepository.ts', () => {
  return {
    __esModule: true,
    default: {
      getAllUsers: jest.fn(),
      deleteUserById: jest.fn(),
      getUserById: jest.fn(),
      updateUserById: jest.fn(),
      getUserByUsername: jest.fn(),
    },
  };
});

jest.mock('./../../services/dtos/user.dto');

describe('userService.getAllUsers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return list of users', async () => {
    const mockQueryParams: IUserQueryParams = {
      page: '2',
    };

    const mockUsers: IUser[] = [
      {
        Id: 1,
        Username: 'a',
        Name: 'a',
        Email: 'a@gmail.com',
        Role: UserRoles.USER,
        JoinDate: new Date(),
      },
      {
        Id: 2,
        Username: 'b',
        Name: 'b',
        Email: 'b@gmail.com',
        Role: UserRoles.USER,
        JoinDate: new Date(),
      },
    ];

    const mockUsersResponseDTO: IUserResponse[] = [
      {
        Username: 'a',
        Name: 'a',
        Email: 'a@gmail.com',
      },
      {
        Username: 'b',
        Name: 'b',
        Email: 'b@gmail.com',
      },
    ];

    (userRepository.getAllUsers as jest.Mock).mockResolvedValueOnce(mockUsers);

    mockUsersResponseDTO.forEach((user) => {
      (UserResponseDTO as jest.Mock).mockReturnValueOnce(user);
    });

    const usersResponseDTO: IUserResponse[] =
      await userService.getAllUsers(mockQueryParams);

    expect(usersResponseDTO).toEqual(mockUsersResponseDTO);
  });

  it('should throw invalid page number error', async () => {
    const mockBadQueryParams: IUserQueryParams = {
      page: 'abcd',
    };

    const BadRequestError = new AppError(
      'Invalid page number',
      HTTPStatusCode.BadRequest
    );

    await expect(userService.getAllUsers(mockBadQueryParams)).rejects.toThrow(
      BadRequestError
    );
  });

  it('should return list of users with status 200', async () => {
    const mockQueryParams: IUserQueryParams = {
      page: '2',
    };

    const mockUserNotFoundError = new AppError(
      'No users found in the database',
      HTTPStatusCode.NotFound
    );

    (userRepository.getAllUsers as jest.Mock).mockResolvedValueOnce([]);

    await expect(userService.getAllUsers(mockQueryParams)).rejects.toThrow(
      mockUserNotFoundError
    );
  });
});

describe('userService.getUserById', () => {
  const id: number = 3;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user with', async () => {
    const mockUser: IUser = {
      Id: 1,
      Username: 'a',
      Name: 'a',
      Email: 'a@gmail.com',
      Role: UserRoles.USER,
      JoinDate: new Date(),
    };

    const mockUserResponseDTO: IUserResponse = {
      Username: 'a',
      Name: 'a',
      Email: 'a@gmail.com',
    };

    (userRepository.getUserById as jest.Mock).mockResolvedValueOnce(mockUser);

    (UserResponseDTO as jest.Mock).mockReturnValueOnce(mockUserResponseDTO);

    const userResponseDTO: IUserResponse | undefined =
      await userService.getUserById(id);

    expect(userResponseDTO).toEqual(mockUserResponseDTO);
  });

  it('should throw user not found error', async () => {
    const mockUserNotFoundError = new AppError(
      'User not found',
      HTTPStatusCode.NotFound
    );

    (userRepository.getUserById as jest.Mock).mockRejectedValueOnce(
      mockUserNotFoundError
    );

    await expect(userService.getUserById(id)).rejects.toThrow(
      mockUserNotFoundError
    );
  });
});
