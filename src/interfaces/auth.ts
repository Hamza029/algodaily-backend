interface IAuthAttributes {
  id: string;
  username: string;
  name: string;
  role: number;
  password: string;
  token: string;
  passwordModifiedAt: Date;
}

export interface IAuth
  extends Omit<IAuthAttributes, 'name' | 'role' | 'token'> {}

export interface IAuthInput
  extends Pick<IAuthAttributes, 'username' | 'password'> {}

export interface IAuthDbInput
  extends Pick<
    IAuthAttributes,
    'username' | 'password' | 'passwordModifiedAt'
  > {}

export interface IAuthJWTPayload
  extends Pick<IAuthAttributes, 'id' | 'username' | 'name' | 'role'> {
  iat?: number;
  exp?: number;
}

export interface IAuthLoginResponse extends Pick<IAuthAttributes, 'token'> {}

export interface IUpdatePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface IUpdatePasswordDbInput
  extends Pick<IAuthAttributes, 'password' | 'passwordModifiedAt'> {}
