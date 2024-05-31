interface IAuthAttributes {
  Id: number;
  Username: string;
  Name: string;
  Role: number;
  Password: string;
}

export interface IAuth extends Omit<IAuthAttributes, 'Name' | 'Role'> {}

export interface IAuthInput
  extends Pick<IAuthAttributes, 'Username' | 'Password'> {}

export interface IAuthDbInput
  extends Pick<IAuthAttributes, 'Username' | 'Password'> {}

export interface IAuthJWTPayload
  extends Pick<IAuthAttributes, 'Username' | 'Name' | 'Role'> {}
