import { User, UserInput, UserDbInput } from './user';
import { Auth, AuthDbInput } from './auth';

export interface UserType extends User {}
export interface AuthType extends Auth {}
export interface UserInputType extends UserInput {}
export interface UserDbInputType extends UserDbInput {}
export interface AuthDbInputType extends AuthDbInput {}
