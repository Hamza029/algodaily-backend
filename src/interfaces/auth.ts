interface IAuthAttributes {
  Id: number;
  Username: string;
  Password: string;
}

export interface IAuth extends IAuthAttributes {}

export interface IAuthInput extends Omit<IAuthAttributes, 'Id'> {}

export interface IAuthDbInput extends Omit<IAuthAttributes, 'Id'> {}
