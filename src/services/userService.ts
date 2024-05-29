import { UserType } from './../interfaces/index';
import userRepository from './../repository/userRepository';

const getAllUsers = async (): Promise<UserType[]> => {
    const users: UserType[] = await userRepository.getAllUsers();

    if (!users || users.length === 0) {
        throw new Error('No users found');
    }

    return users;
};

const deleteUserById = async (id: number): Promise<number> => {
    const deletedId: number = await userRepository.deleteUserById(id);

    if (deletedId === 0) {
        throw new Error("Couldn't delete user");
    }

    return deletedId;
};

const getUserById = async (id: number): Promise<UserType> => {
    const user: UserType | undefined = await userRepository.getUserById(id);

    if (!user) {
        throw new Error("User doesn't exist!");
    }

    return user;
};

const updateNameById = async (id: number, name: string): Promise<UserType> => {
    const user: UserType | undefined = await userRepository.getUserById(id);

    if (!user) {
        throw new Error("User doesn't exist");
    }

    const userUpdated: boolean = await userRepository.updateNameById(id, name);

    if (!userUpdated) {
        throw new Error("Couldn't update user");
    }

    user.Name = name;

    return user;
};

export default {
    getAllUsers,
    deleteUserById,
    getUserById,
    updateNameById,
};
