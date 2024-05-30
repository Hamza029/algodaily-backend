import { IAuth } from './../interfaces/auth';
import { IUser } from '../interfaces/user';
import db from '../database/db';
import { Knex } from 'knex';

const getAllUsers = async (): Promise<IUser[]> => {
    const users: IUser[] = await db<IUser>('User').select('*');
    return users;
};

const deleteUserById = async (id: number): Promise<number> => {
    const trx: Knex.Transaction = await db.transaction();

    try {
        const targetUser: IUser | undefined = await trx<IUser>('User')
            .select('*')
            .where({ Id: id })
            .first();

        if (!targetUser) {
            throw new Error("User doesn't exist");
        }

        const userDeleted: number = await trx<IUser>('User')
            .where({ Id: id })
            .del();
        const authDeleted: number = await trx<IAuth>('Auth')
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

const getUserById = async (id: number): Promise<IUser | undefined> => {
    const user: IUser | undefined = await db<IUser>('user')
        .where('Id', id)
        .select('*')
        .first();
    return user;
};

const updateNameById = async (id: number, name: string): Promise<boolean> => {
    const userUpdated = await db<IUser>('User')
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
