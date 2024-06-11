import { Knex } from 'knex';

import { IUserDbInput, IUser, IAuthDbInput, IAuth } from '../interfaces';
import db from './../database/db';
import KnexError from '../utils/knexError';

const signup = async (
  userDbInput: IUserDbInput,
  authDbInput: IAuthDbInput
): Promise<void> => {
  const trx: Knex.Transaction = await db.transaction();

  try {
    await trx<IAuth>('Auth').insert(authDbInput);
    await trx<IUser>('User').insert(userDbInput);

    await trx.commit();
  } catch (err) {
    await trx.rollback();
    throw err as KnexError;
  }
};

const login = async (authInput: IAuthDbInput): Promise<IAuth | undefined> => {
  const auth: IAuth | undefined = await db<IAuth>('Auth')
    .select('*')
    .where('Username', '=', authInput.Username)
    .first();

  return auth;
};

const updateMyPassword = async (
  id: number,
  password: string
): Promise<void> => {
  await db<IAuth>('Auth').update({ Password: password }).where({ Id: id });
};

const getAuthByUsername = async (
  useranme: string
): Promise<IAuth | undefined> => {
  const auth: IAuth | undefined = await db<IAuth>('Auth')
    .select('*')
    .where({ Username: useranme })
    .first();
  return auth;
};

export default {
  signup,
  login,
  updateMyPassword,
  getAuthByUsername,
};
