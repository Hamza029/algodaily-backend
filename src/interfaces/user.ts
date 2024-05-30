export interface User {
  Id: number;
  Username: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: number;
}

export interface UserInput extends Omit<User, 'Id' | 'JoinDate' | 'Role'> {
  Password: string;
}

export interface UserDbInput extends Omit<User, 'Id'> {}

export default User;
