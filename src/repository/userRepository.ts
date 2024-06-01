import { IUser, IAuth, IUserUpdateInput } from '../interfaces';
import db from '../database/db';
import { Knex } from 'knex';

const getAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await db<IUser>('User').select('*');
  return users;
};

const deleteUserById = async (
  id: number,
  username: string,
): Promise<boolean> => {
  const trx: Knex.Transaction = await db.transaction();

  try {
    await trx<IUser>('User').where({ Id: id }).del();
    await trx<IAuth>('Auth').where({ Username: username }).del();

    await trx.commit();

    return true;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

const getUserById = async (id: number): Promise<IUser | undefined> => {
  const user: IUser | undefined = await db<IUser>('user')
    .where('Id', id)
    .select('*')
    .first();
  return user;
};

const updateUserById = async (id: number, userUpdateDbInput: IUserUpdateInput): Promise<boolean> => {
  const userUpdated = await db<IUser>('User')
    .where('Id', '=', id)
    .update(userUpdateDbInput);

  return userUpdated === 1;
};

const getUserByUsername = async (
  username: string,
): Promise<IUser | undefined> => {
  const targetUser: IUser | undefined = await db<IUser>('User')
    .where('Username', '=', username)
    .first();

  return targetUser;
};

export default {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
  getUserByUsername,
};
