interface IAuthAttributes {
  Id: string;
  Username: string;
  Name: string;
  Role: number;
  Password: string;
  token: string;
  PasswordModifiedAt: Date;
}

export interface IAuth
  extends Omit<IAuthAttributes, 'Name' | 'Role' | 'token'> {}

export interface IAuthInput
  extends Pick<IAuthAttributes, 'Username' | 'Password'> {}

export interface IAuthDbInput
  extends Pick<
    IAuthAttributes,
    'Username' | 'Password' | 'PasswordModifiedAt'
  > {}

export interface IAuthJWTPayload
  extends Pick<IAuthAttributes, 'Username' | 'Name' | 'Role'> {
  iat?: number;
  exp?: number;
}

export interface IAuthLoginResponse extends Pick<IAuthAttributes, 'token'> {}

export interface IUpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface IUpdatePasswordDbInput
  extends Pick<IAuthAttributes, 'Password' | 'PasswordModifiedAt'> {}
