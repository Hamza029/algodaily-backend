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

const deleteUserById = async (id: number) => {
    const deletedId = userRepository.deleteUserById(id);

    if (!deletedId) {
        throw new Error("Couldn't delete user");
    }

    return deletedId;
};

export default {
    getAllUsers,
    createUser,
    deleteUserById,
};
