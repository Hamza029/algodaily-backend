import {
    AuthDbInputType,
    AuthInputType,
    AuthType,
    UserDbInputType,
    UserInputType,
    UserType,
} from './../interfaces';
import authRepository from '../repository/authRepository';
import passwordUtil from '../utils/passwordUtil';

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
        Password: await passwordUtil.hash(userInput.Password),
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

    if (
        !auth ||
        !(await passwordUtil.compare(authInput.Password, auth.Password))
    ) {
        throw new Error('wrong username or password');
    }

    return 'Logged in';
};

export default {
    signup,
    login,
};
