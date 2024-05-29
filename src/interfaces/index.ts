import { User, UserInput, UserDbInput } from './user';
import { Auth, AuthInput, AuthDbInput } from './auth';

export interface UserType extends User {}
export interface AuthType extends Auth {}
export interface UserInputType extends UserInput {}
export interface AuthInputType extends AuthInput {}
export interface UserDbInputType extends UserDbInput {}
export interface AuthDbInputType extends AuthDbInput {}
