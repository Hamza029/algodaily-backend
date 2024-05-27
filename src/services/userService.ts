import { UserType, UserInputType } from './../interfaces/index';
import userRepository from './../repository/userRepository';

const getAllUsers = async (): Promise<UserType[]> => {
    const users = await userRepository.getAllUsers();

    if (!users || users.length === 0) {
        throw new Error('No users found');
    }

    return users;
};

const createUser = async (user: UserInputType): Promise<UserType> => {
    const newUser = await userRepository.createUser(user);

    if (!newUser) {
        throw new Error("Couldn't insert user");
    }

    return newUser;
};

const deleteUserById = async (id: number): Promise<number> => {
    const deletedId = await userRepository.deleteUserById(id);

    if (!deletedId) {
        throw new Error("Couldn't delete user");
    }

    return deletedId;
};

const getUserById = async (id: number): Promise<UserType> => {
    const user = await userRepository.getUserById(id);

    if (!user) {
        throw new Error("User doesn't exist!");
    }

    return user;
};

export default {
    getAllUsers,
    createUser,
    deleteUserById,
    getUserById,
};
