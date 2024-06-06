import {
  IUserInput,
  IAuthDbInput,
  IAuthInput,
  IAuthLoginResponse,
} from '../../interfaces';

export class AuthDbInputDTO implements IAuthDbInput {
  Username: string;
  Password: string;

  constructor(user: IUserInput) {
    this.Username = user.Username;
    this.Password = user.Password;
  }
}

export class AuthInputDTO implements IAuthInput {
  Username: string;
  Password: string;

  constructor(auth: IAuthInput) {
    this.Username = auth.Username;
    this.Password = auth.Password;
  }
}

export class AuthLoginResponseDTO implements IAuthLoginResponse {
  Token: string;

  constructor(Token: string) {
    this.Token = `Bearer ${Token}`;
  }
}
