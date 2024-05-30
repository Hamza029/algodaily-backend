import { Knex } from 'knex';

import { IUserDbInput, IUser } from '../interfaces/user';
import { IAuthDbInput, IAuthInput, IAuth } from '../interfaces/auth';
import db from './../database/db';

const signup = async (
    userDbInput: IUserDbInput,
    authDbInput: IAuthDbInput
): Promise<IUser> => {
    const trx: Knex.Transaction = await db.transaction();

    try {
        await trx<IAuth>('Auth').insert(authDbInput);
        const [newUserId] = await trx<IUser>('User').insert(userDbInput);

        await trx.commit();

        const newUser: IUser = {
            Id: newUserId,
            ...userDbInput,
        };

        return newUser;
    } catch (err) {
        await trx.rollback();
        throw err;
    }
};

const login = async (
    authInput: IAuthDbInput
): Promise<IAuth | undefined> => {
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
