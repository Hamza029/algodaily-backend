import { Knex } from 'knex';

import { IUserDbInput, IUser, IAuthDbInput, IAuth } from '../interfaces';
import db from './../database/db';
import KnexError from '../utils/knexError';

const signup = async (
  userDbInput: IUserDbInput,
  authDbInput: IAuthDbInput
): Promise<IUser> => {
  const trx: Knex.Transaction = await db.transaction();

  try {
    const [newUserId] = await trx<IUser>('User').insert(userDbInput);
    await trx<IAuth>('Auth').insert(authDbInput);

    await trx.commit();

    const newUser: IUser = {
      Id: newUserId,
      ...userDbInput,
    };

    return newUser;
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

export default {
  signup,
  login,
};
