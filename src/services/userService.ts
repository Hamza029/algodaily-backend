import { IUser } from '../interfaces';
import jwtUtil from '../utils/jwtUtil';
import userRepository from './../repository/userRepository';

const getAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await userRepository.getAllUsers();

  if (!users || users.length === 0) {
    throw new Error('No users found');
  }

  return users;
};

const deleteUserById = async (
  id: number,
  token: string | undefined,
): Promise<boolean> => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new Error("User doesn't exist");
  }

  await jwtUtil.authorize(token, user.Username);

  const isDeleted: boolean = await userRepository.deleteUserById(
    id,
    user.Username,
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

const updateNameById = async (
  id: number,
  name: string,
  token: string | undefined,
): Promise<IUser> => {
  const user: IUser | undefined = await userRepository.getUserById(id);

  if (!user) {
    throw new Error("User doesn't exist");
  }

  await jwtUtil.authorize(token, user.Username);

  const userUpdated: boolean = await userRepository.updateNameById(id, name);

  if (!userUpdated) {
    throw new Error("Couldn't update user");
  }

  user.Name = name;

  return user;
};

export default {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateNameById,
};
