import { HTTPStatusCode } from '../constants';
import { IUser, IUserUpdateInput } from '../interfaces';
import AppError from '../utils/appError';
import jwtUtil from '../utils/jwtUtil';
import userRepository from './../repository/userRepository';

const getAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await userRepository.getAllUsers();

  if (!users || users.length === 0) {
    throw new AppError(
      'No users found in the database',
      HTTPStatusCode.NotFound
    );
  }

  return users;
};

const protect = async (id: number, token: string | undefined) => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new AppError('User not found', HTTPStatusCode.NotFound);
  }

  await jwtUtil.authorize(token, user.Username);
};

const deleteUserById = async (id: number): Promise<void> => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new AppError('User not found', HTTPStatusCode.NotFound);
  }

  await userRepository.deleteUserById(id, user.Username);
};

const getUserById = async (id: number): Promise<IUser> => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new AppError('User not found', HTTPStatusCode.NotFound);
  }

  return user;
};

const updateUserById = async (
  id: number,
  userUpdateInput: IUserUpdateInput
): Promise<IUser> => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new AppError('User not found', HTTPStatusCode.NotFound);
  }

  // need to make sure that only certain fields are allowed to be updated
  const userUpdateDbInput: IUserUpdateInput = {
    Name: userUpdateInput.Name || user.Name,
  };

  const userUpdated: boolean = await userRepository.updateUserById(
    id,
    userUpdateDbInput
  );

  if (!userUpdated) {
    throw new AppError(
      'An unexpected error occurred while updating user',
      HTTPStatusCode.InternalServerError
    );
  }

  user.Name = userUpdateDbInput.Name;

  return user;
};

export default {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  protect,
};
