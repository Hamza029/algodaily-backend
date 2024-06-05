import { IsNotEmpty, MinLength, validate} from "class-validator";

import { IUserInput, IAuthDbInput, IAuthInput, IAuthLoginResponse, IAuthJWTPayload, IUser } from "../../interfaces";
import { whitelist } from "validator";

export class AuthDbInputDTO implements IAuthDbInput {
  @IsNotEmpty()
  Username: string;

  @IsNotEmpty()
  @MinLength(5)
  Password: string;

  constructor(user: IUserInput) {
    this.Username = user.Username;
    this.Password = user.Password;
  }
}

export class AuthInputDTO implements IAuthInput {
  @IsNotEmpty()
  Username: string;

  @IsNotEmpty()
  Password: string;

  constructor(auth: IAuthInput) {
    this.Username = auth.Username;
    this.Password = auth.Password;
  }
}

export class AuthLoginResponseDTO implements IAuthLoginResponse {
  Token: string;

  constructor(Token: string) {
    this.Token = Token;
  }
}
