import { IAuthJWTPayload, IUpdatePasswordInput } from './../interfaces/auth';
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
import { HTTPStatusCode } from './../constants';
import AppError from '../utils/appError';
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
    throw new AppError(
      'wrong username or password',
      HTTPStatusCode.Unauthorized
    );
  }

  const user: IUser | undefined = await userRepository.getUserByUsername(
    auth.Username
  );

  if (!user) {
    throw new AppError(
      'wrong username or password',
      HTTPStatusCode.Unauthorized
    );
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

const updateMyPassword = async (user: IUser, reqBody: IUpdatePasswordInput) => {
  const id = user.Id;

  const auth: IAuth = (await authRepository.getAuthByUsername(user.Username))!;

  const passwordMatches = passwordUtil.compare(
    reqBody.currentPassword,
    auth.Password
  );

  if (!passwordMatches) {
    throw new AppError("Password doesn't exist", HTTPStatusCode.BadRequest);
  }

  const newPassword = reqBody.newPassword;
  const newHashedPassword = await passwordUtil.hash(newPassword);
  await authRepository.updateMyPassword(id, newHashedPassword);
};

export default {
  signup,
  login,
  updateMyPassword,
};
