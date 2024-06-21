import { HTTPStatusCode, UserRoles } from '../../constants';
import {
  IUser,
  IUserQueryParams,
  IUserResponse,
  IUserUpdateDbInput,
  IUserUpdateInput,
} from '../../interfaces';
import userRepository from '../../repository/userRepository';
import {
  UserResponseDTO,
  UserUpdateDBInputDTO,
} from '../../services/dtos/user.dto';
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

jest.mock('./../../services/dtos/user.dto', () => {
  return {
    __esModule: true,
    UserResponseDTO: jest.fn(),
    UserUpdateDBInputDTO: jest.fn(),
  };
});

describe('userService.getAllUsers', () => {
  afterEach(() => {
    jest.resetAllMocks();
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
    jest.resetAllMocks();
  });

  it('should return a user', async () => {
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

    (userRepository.getUserById as jest.Mock).mockResolvedValueOnce(undefined);

    await expect(userService.getUserById(id)).rejects.toThrow(
      mockUserNotFoundError
    );
  });
});

describe('userService.deleteUserById', () => {
  const id: number = 3;

  const mockUser: IUser = {
    Id: 3,
    Username: 'a',
    Name: 'a',
    Email: 'a@gmail.com',
    Role: UserRoles.USER,
    JoinDate: new Date(),
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should delete a user', async () => {
    (userRepository.getUserById as jest.Mock).mockResolvedValueOnce(mockUser);

    (userRepository.deleteUserById as jest.Mock).mockImplementationOnce(
      async (_id: number) => {}
    );

    expect(userService.deleteUserById(id)).resolves.toBeNull;
  });

  it('should thorw user not found error', async () => {
    jest.spyOn(userRepository, 'getUserById').mockResolvedValueOnce(undefined);
    const deleteUserSpy = jest
      .spyOn(userRepository, 'deleteUserById')
      .mockResolvedValueOnce(undefined);

    const mockUserNotFoundError = new AppError(
      'User not found',
      HTTPStatusCode.NotFound
    );

    expect(userService.deleteUserById(id)).rejects.toThrow(
      mockUserNotFoundError
    );

    expect(deleteUserSpy).not.toHaveBeenCalled();
  });
});

describe('userService.updateUserById', () => {
  const id: number = 3;

  const mockUser: IUser = {
    Id: 3,
    Username: 'a',
    Name: 'a',
    Email: 'a@gmail.com',
    Role: UserRoles.USER,
    JoinDate: new Date(),
  };

  const mockUserUpdateInput: IUserUpdateInput = {
    Name: 'b',
  };

  const mockUserUpdateDbInput: IUserUpdateDbInput = {
    Name: 'b',
  };

  const mockUserResponseDTO: IUserResponse = {
    Name: 'b',
    Username: 'a',
    Email: 'a@gmail.com',
  };

  it('should update a user', async () => {
    (userRepository.getUserById as jest.Mock).mockResolvedValueOnce(mockUser);
    (UserUpdateDBInputDTO as jest.Mock).mockResolvedValueOnce(
      mockUserUpdateDbInput
    );
    (userRepository.updateUserById as jest.Mock).mockResolvedValueOnce(true);
    (UserResponseDTO as jest.Mock).mockResolvedValueOnce(mockUserResponseDTO);

    const userResponseDTO = await userService.updateUserById(
      id,
      mockUserUpdateInput
    );

    expect(userResponseDTO).toEqual(mockUserResponseDTO);
  });

  it('should throw unexpected error', async () => {
    (userRepository.getUserById as jest.Mock).mockResolvedValueOnce(mockUser);
    (UserUpdateDBInputDTO as jest.Mock).mockResolvedValueOnce(
      mockUserUpdateDbInput
    );
    (userRepository.updateUserById as jest.Mock).mockResolvedValueOnce(false);
    (UserResponseDTO as jest.Mock).mockResolvedValueOnce(mockUserResponseDTO);

    const mockUnexpectedError = new AppError(
      'An unexpected error occurred while updating user',
      HTTPStatusCode.InternalServerError
    );

    await expect(
      userService.updateUserById(id, mockUserUpdateInput)
    ).rejects.toThrow(mockUnexpectedError);
  });

  it('should throw user not found error', async () => {
    (userRepository.getUserById as jest.Mock).mockResolvedValueOnce(undefined);

    const mockUserNotFoundError = new AppError(
      'User not found',
      HTTPStatusCode.NotFound
    );

    await expect(
      userService.updateUserById(id, mockUserUpdateInput)
    ).rejects.toThrow(mockUserNotFoundError);
  });
});
