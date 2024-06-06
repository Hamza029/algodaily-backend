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
import { UserDbInputDTO } from './dtos/user.dto';
import {
  AuthDbInputDTO,
  AuthInputDTO,
  AuthLoginResponseDTO,
} from './dtos/auth.dto';

const signup = async (userInput: IUserInput): Promise<void> => {
  const userDbInputDTO: IUserDbInput = new UserDbInputDTO(userInput);

  const authDbInputDTO: IAuthDbInput = new AuthDbInputDTO(userInput);

  authDbInputDTO.Password = await passwordUtil.hash(authDbInputDTO.Password);

  await authRepository.signup(userDbInputDTO, authDbInputDTO);
};

const login = async (
  authUserInput: IAuthInput
): Promise<IAuthLoginResponse> => {
  const authInputDTO: IAuthInput = new AuthInputDTO(authUserInput);

  const auth: IAuth | undefined = await authRepository.login(authInputDTO);

  if (
    !auth ||
    !(await passwordUtil.compare(authInputDTO.Password, auth.Password))
  ) {
    throw new Error('wrong username or password');
  }

  const user: IUser | undefined = await userRepository.getUserByUsername(
    auth.Username
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

  const loginResponseDTO: IAuthLoginResponse = new AuthLoginResponseDTO(token);

  return loginResponseDTO;
};

export default {
  signup,
  login,
};
