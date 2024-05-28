export interface Auth {
    Id: Number;
    Username: string;
    Password: string;
}

export interface AuthDbInput extends Omit<Auth, 'Id'> {}

export default Auth;
