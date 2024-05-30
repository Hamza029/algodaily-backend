export interface Auth {
  Id: number;
  Username: string;
  Password: string;
}

export interface AuthInput extends Omit<Auth, 'Id'> {}

export interface AuthDbInput extends Omit<Auth, 'Id'> {}

export default Auth;
