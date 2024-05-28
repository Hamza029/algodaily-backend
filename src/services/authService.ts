import {
    AuthDbInputType,
    UserDbInputType,
    UserInputType,
    UserType,
} from '../interfaces';
import authRepository from '../repository/authRepository';

const signup = async (userInput: UserInputType): Promise<UserType> => {
    const userDbInput: UserDbInputType = {
        Name: userInput.Name,
        Username: userInput.Username,
        Email: userInput.Email,
        JoinDate: new Date(),
        Role: 0,
    };

    const authDbInput: AuthDbInputType = {
        Username: userInput.Username,
        Password: userInput.Password,
    };

    const newUser = await authRepository.signup(userDbInput, authDbInput);

    if (!newUser) {
        throw new Error("Couldn't register user");
    }

    return newUser;
};

export default {
    signup,
};
