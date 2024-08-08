import { IAuthJWTPayload, IUpdatePasswordInput } from './../interfaces/auth';
import {
  IAuth,
  IAuthInput,
  IAuthDbInput,
  IUser,
  IUserInput,
  IUserDbInput,
  IAuthLoginResponse,
  IUpdatePasswordDbInput,
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
  UpdatePasswordDbInputDTO,
} from './dtos/auth.dto';

const signup = async (userInput: IUserInput): Promise<void> => {
  const userDbInputDTO: IUserDbInput = new UserDbInputDTO(userInput);

  const authDbInputDTO: IAuthDbInput = new AuthDbInputDTO(userInput);

  authDbInputDTO.password = await passwordUtil.hash(authDbInputDTO.password);

  await authRepository.signup(userDbInputDTO, authDbInputDTO);
};

const login = async (
  authUserInput: IAuthInput
): Promise<IAuthLoginResponse> => {
  const authInputDTO: IAuthInput = new AuthInputDTO(authUserInput);

  const auth: IAuth | undefined = await authRepository.login(authInputDTO);

  if (
    !auth ||
    !(await passwordUtil.compare(authInputDTO.password, auth.password))
  ) {
    throw new AppError(
      'Wrong username or password',
      HTTPStatusCode.Unauthorized
    );
  }

  const user: IUser | undefined = await userRepository.getUserByUsername(
    auth.username
  );

  if (!user) {
    throw new AppError(
      'Wrong username or password',
      HTTPStatusCode.Unauthorized
    );
  }

  const jwtPayload: IAuthJWTPayload = {
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role,
  };

  const token: string = jwtUtil.getToken(jwtPayload);

  const loginResponseDTO: IAuthLoginResponse = new AuthLoginResponseDTO(token);

  return loginResponseDTO;
};

const updateMyPassword = async (user: IUser, reqBody: IUpdatePasswordInput) => {
  const auth: IAuth = (await authRepository.getAuthByUsername(user.username))!;

  const passwordMatches = await passwordUtil.compare(
    reqBody.currentPassword,
    auth.password
  );

  if (!passwordMatches) {
    throw new AppError(
      'Your current password is incorrect',
      HTTPStatusCode.Forbidden
    );
  }

  const newPassword = reqBody.newPassword;
  const newHashedPassword = await passwordUtil.hash(newPassword);

  reqBody.newPassword = newHashedPassword;

  const updatePasswordDbInputDTO: IUpdatePasswordDbInput =
    new UpdatePasswordDbInputDTO(reqBody);

  await authRepository.updateMyPassword(
    auth.username,
    updatePasswordDbInputDTO
  );
};

export default {
  signup,
  login,
  updateMyPassword,
};
