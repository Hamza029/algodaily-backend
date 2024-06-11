interface IAuthAttributes {
  Id: number;
  Username: string;
  Name: string;
  Role: number;
  Password: string;
  Token: string;
}

export interface IAuth extends Omit<IAuthAttributes, 'Name' | 'Role'> {}

export interface IAuthInput
  extends Pick<IAuthAttributes, 'Username' | 'Password'> {}

export interface IAuthDbInput
  extends Pick<IAuthAttributes, 'Username' | 'Password'> {}

export interface IAuthJWTPayload
  extends Pick<IAuthAttributes, 'Username' | 'Name' | 'Role'> {
  iat?: number;
  exp?: number;
}

export interface IAuthLoginResponse extends Pick<IAuthAttributes, 'Token'> {}
