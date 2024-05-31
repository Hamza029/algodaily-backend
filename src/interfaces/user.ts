interface IUserAttributes {
  Id: number;
  Username: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: number;
  Password: string;
}

export interface IUser extends Omit<IUserAttributes, 'Password'> {}

export interface IUserInput
  extends Omit<IUserAttributes, 'Id' | 'JoinDate' | 'Role'> {}

export interface IUserDbInput
  extends Omit<IUserAttributes, 'Id' | 'Password'> {}
