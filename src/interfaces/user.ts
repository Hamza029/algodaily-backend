import { UserRoles } from '../constants';
import { HATEOAS_Types } from './hateoas';

interface IUserAttributes {
  id: string;
  username: string;
  email: string;
  name: string;
  joinDate: Date;
  role: UserRoles;
  password: string;
  _links: HATEOAS_Types;
}

export interface IUser extends Omit<IUserAttributes, 'password' | '_links'> {}

export interface IUserInput
  extends Omit<IUserAttributes, 'id' | 'joinDate' | 'role' | '_links'> {}

export interface IUserResponse
  extends Pick<
    IUserAttributes,
    'id' | 'username' | 'name' | 'email' | '_links'
  > {}

export interface IUserDbInput
  extends Omit<IUserAttributes, 'id' | 'password' | '_links'> {}

export interface IUserUpdateInput extends Pick<IUserAttributes, 'name'> {}

export interface IUserUpdateDbInput extends Pick<IUserAttributes, 'name'> {}
