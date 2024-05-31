import { IAuthJWTPayload } from './../interfaces/auth';
import {
  IAuth,
  IAuthInput,
  IAuthDbInput,
  IUser,
  IUserInput,
  IUserDbInput,
  IAuthLoginResponse,
} from '../interfaces';
import authRepository from '../repository/authRepository';
import userRepository from '../repository/userRepository';
import passwordUtil from '../utils/passwordUtil';
import jwtUtil from '../utils/jwtUtil';

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

const login = async (authInput: IAuthInput): Promise<IAuthLoginResponse> => {
  const auth: IAuth | undefined = await authRepository.login(authInput);

  if (
    !auth ||
    !(await passwordUtil.compare(authInput.Password, auth.Password))
  ) {
    throw new Error('wrong username or password');
  }

  const user: IUser | undefined = await userRepository.getUserByUsername(
    auth.Username,
  );

  if (!user) {
    throw new Error('wrong username or password');
  }

  const jwtPayload: IAuthJWTPayload = {
    Username: user.Username,
    Name: user.Name,
    Role: user.Role,
  };

  const token: string = jwtUtil.getToken(jwtPayload);

  const loginResponse: IAuthLoginResponse = {
    ...jwtPayload,
    Token: token,
  };

  return loginResponse;
};

export default {
  signup,
  login,
};
