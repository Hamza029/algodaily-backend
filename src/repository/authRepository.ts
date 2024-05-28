import { Knex } from 'knex';

import {
    UserType,
    UserDbInputType,
    AuthType,
    AuthDbInputType,
} from '../interfaces';
import db from './../database/db';

const signup = async (
    userDbInput: UserDbInputType,
    authDbInput: AuthDbInputType
): Promise<UserType> => {
    const trx: Knex.Transaction = await db.transaction();

    try {
        await trx<AuthType>('Auth').insert(authDbInput);
        const [newUserId] = await trx<UserType>('User').insert(userDbInput);

        await trx.commit();

        const newUser: UserType = {
            Id: newUserId,
            ...userDbInput,
        };

        return newUser;
    } catch (err) {
        await trx.rollback();
        throw err;
    }
};

export default {
    signup,
};
