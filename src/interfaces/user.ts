import { UserRoles } from '../constants';
import { HATEOAS_Types } from './hateoas';

interface IUserAttributes {
  Id: string;
  Username: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: UserRoles;
  Password: string;
  _links: HATEOAS_Types;
}

export interface IUser extends Omit<IUserAttributes, 'Password' | '_links'> {}

export interface IUserInput
  extends Omit<IUserAttributes, 'Id' | 'JoinDate' | 'Role' | '_links'> {}

export interface IUserResponse
  extends Pick<IUserAttributes, 'Username' | 'Name' | 'Email' | '_links'> {}

export interface IUserDbInput
  extends Omit<IUserAttributes, 'Id' | 'Password' | '_links'> {}

export interface IUserUpdateInput extends Pick<IUserAttributes, 'Name'> {}

export interface IUserUpdateDbInput extends Pick<IUserAttributes, 'Name'> {}
