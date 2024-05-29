import {
    AuthDbInputType,
    AuthInputType,
    AuthType,
    UserDbInputType,
    UserInputType,
    UserType,
} from './../interfaces';
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

    const newUser: UserType = await authRepository.signup(
        userDbInput,
        authDbInput
    );

    if (!newUser) {
        throw new Error("Couldn't register user");
    }

    return newUser;
};

const login = async (authInput: AuthInputType): Promise<string> => {
    const auth: AuthType | undefined = await authRepository.login(authInput);

    if (!auth) {
        return 'Not logged in';
    }

    return 'Logged in';
};

export default {
    signup,
    login,
};
