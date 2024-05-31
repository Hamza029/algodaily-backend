import { IAuth, IAuthInput, IAuthDbInput } from '../interfaces/auth';
import { IUser, IUserInput, IUserDbInput } from './../interfaces/user';
import authRepository from '../repository/authRepository';
import passwordUtil from '../utils/passwordUtil';

const signup = async (userInput: IUserInput): Promise<IUser> => {
  const userDbInput: IUserDbInput = {
    Name: userInput.Name,
    Username: userInput.Username,
    Email: userInput.Email,
    JoinDate: new Date(),
    Role: 0,
  };

  const authDbInput: IAuthDbInput = {
    Username: userInput.Username,
    Password: await passwordUtil.hash(userInput.Password),
  };

  const newUser: IUser = await authRepository.signup(userDbInput, authDbInput);

  if (!newUser) {
    throw new Error("Couldn't register user");
  }

  return newUser;
};

const login = async (authInput: IAuthInput): Promise<string> => {
  const auth: IAuth | undefined = await authRepository.login(authInput);

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
