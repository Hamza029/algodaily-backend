import User from './user';
import Auth from './auth';

export interface UserType extends User {}
export interface AuthType extends Auth {}
export interface UserInputType extends Omit<User, 'Id'> {}
