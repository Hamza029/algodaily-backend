import { UserType, UserInputType } from './../interfaces/index';
import db from '../db/db';

const getAllUsers = async (): Promise<UserType[]> => {
    try {
        const users: UserType[] = await db<UserType>('user').select('*');
        return users;
    } catch (err) {
        let errString = "Couldn't fetch users.";

        if (err instanceof Error) {
            errString += ` Error: ${err.message}`;
        }

        throw new Error(errString);
    }
};

const createUser = async (user: UserInputType): Promise<UserType> => {
    try {
        const [Id] = await db<UserType>('user').insert({
            Username: user.Username,
            Email: user.Email,
            Password: user.Password,
        });
        const newUser = { Id, ...user };
        return newUser;
    } catch (err) {
        let errString = "Couldn't insert user.";

        if (err instanceof Error) {
            errString += ` Error: ${err.message}`;
        }

        throw new Error(errString);
    }
};

const deleteUserById = async (id: number): Promise<number> => {
    try {
        const deletedId = await db<UserType>('user').where('id', id).del();
        // console.log(deletedId);
        return deletedId;
    } catch (err) {
        let errString = `Couldn't delete user with Id ${id}`;

        if (err instanceof Error) {
            errString += ` Error: ${err.message}`;
        }

        throw new Error(errString);
    }
};

const getUserById = async (id: number): Promise<UserType> => {
    try {
        const user = await db<UserType>('user')
            .where('Id', id)
            .select('*')
            .first();
        if (!user) {
            throw new Error("User doesn't exist!");
        }
        return user;
    } catch (err) {
        let errString = `Couldn't find user with Id ${id}.`;

        if (err instanceof Error) {
            errString += ` Error: ${err.message}`;
        }

        throw new Error(errString);
    }
};

export default {
    getAllUsers,
    createUser,
    deleteUserById,
    getUserById,
};
