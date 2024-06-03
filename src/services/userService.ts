import { IUser, IUserUpdateInput } from '../interfaces';
import jwtUtil from '../utils/jwtUtil';
import userRepository from './../repository/userRepository';

const getAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await userRepository.getAllUsers();

  if (!users || users.length === 0) {
    throw new Error('No users found');
  }

  return users;
};

const protect = async (id: number, token: string | undefined) => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new Error("User doesn't exist");
  }

  await jwtUtil.authorize(token, user.Username);
};

const deleteUserById = async (id: number): Promise<boolean> => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new Error("User doesn't exist");
  }

  const isDeleted: boolean = await userRepository.deleteUserById(
    id,
    user.Username
  );

  if (!isDeleted) {
    throw new Error("Couldn't delete user");
  }

  return isDeleted;
};

const getUserById = async (id: number): Promise<IUser> => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new Error("User doesn't exist!");
  }

  return user;
};

const updateUserById = async (
  id: number,
  userUpdateInput: IUserUpdateInput
): Promise<IUser> => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new Error("User doesn't exist");
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
    throw new Error("Couldn't update user");
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
