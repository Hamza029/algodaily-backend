import {
  IUserInput,
  IAuthDbInput,
  IAuthInput,
  IAuthLoginResponse,
  IUpdatePasswordDbInput,
  IUpdatePasswordInput,
} from '../../interfaces';

export class AuthDbInputDTO implements IAuthDbInput {
  username: string;
  password: string;
  passwordModifiedAt: Date;

  constructor(user: IUserInput) {
    this.username = user.username;
    this.password = user.password;
    this.passwordModifiedAt = new Date();
  }
}

export class AuthInputDTO implements IAuthInput {
  username: string;
  password: string;

  constructor(auth: IAuthInput) {
    this.username = auth.username;
    this.password = auth.password;
  }
}

export class AuthLoginResponseDTO implements IAuthLoginResponse {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}

export class UpdatePasswordDbInputDTO implements IUpdatePasswordDbInput {
  password: string;
  passwordModifiedAt: Date;

  constructor(updatePasswordInput: IUpdatePasswordInput) {
    this.password = updatePasswordInput.newPassword;
    this.passwordModifiedAt = new Date();
  }
}
