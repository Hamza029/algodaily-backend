import { AuthType, UserType } from './../interfaces';
import db from '../database/db';
import { Knex } from 'knex';

const getAllUsers = async (): Promise<UserType[]> => {
  const users: UserType[] = await db<UserType>('user').select('*');
  return users;
};

const deleteUserById = async (id: number): Promise<number> => {
  const trx: Knex.Transaction = await db.transaction();

  try {
    const targetUser: UserType | undefined = await trx<UserType>('User')
      .select('*')
      .where({ Id: id })
      .first();

    if (!targetUser) {
      throw new Error("User doesn't exist");
    }

    const userDeleted: number = await trx<UserType>('User')
      .where({ Id: id })
      .del();
    const authDeleted: number = await trx<AuthType>('Auth')
      .where({ Username: targetUser.Username })
      .del();

    if (userDeleted === 0 || authDeleted === 0) {
      throw new Error("Couldn't delete user");
    }

    await trx.commit();

    return 1;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

const getUserById = async (id: number): Promise<UserType | undefined> => {
  const user: UserType | undefined = await db<UserType>('user')
    .where('Id', id)
    .select('*')
    .first();
  return user;
};

const updateNameById = async (id: number, name: string): Promise<boolean> => {
  const userUpdated = await db<UserType>('User')
    .where('Id', '=', id)
    .update({ Name: name });

  return userUpdated === 1;
};

export default {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateNameById,
};
