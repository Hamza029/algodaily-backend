import {
  IUserInput,
  IUserDbInput,
  IUserResponse,
  IUser,
  IUserUpdateDbInput,
  IUserUpdateInput,
  HATEOAS_Types,
} from '../../interfaces';
import { UserRoles } from '../../constants';

export class UserDbInputDTO implements IUserDbInput {
  username: string;
  email: string;
  name: string;
  joinDate: Date;
  role: UserRoles;

  constructor(user: IUserInput) {
    this.username = user.username;
    this.email = user.email;
    this.name = user.name;
    this.joinDate = new Date();
    this.role = UserRoles.USER;
  }
}

export class UserResponseDTO implements IUserResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  _links: HATEOAS_Types;

  constructor(user: IUser) {
    this.id = user.id;
    this.username = user.username;
    this.name = user.name;
    this.email = user.email;
    this._links = {
      self: {
        href: `/api/blogs/${user.id}`,
        method: 'GET',
      },
      update: {
        href: `/api/blogs/${user.id}`,
        method: 'PATCH',
      },
      delete: {
        href: `/api/blogs/${user.id}`,
        method: 'DELETE',
      },
    };
  }
}

export class UserUpdateDBInputDTO implements IUserUpdateDbInput {
  name: string;

  constructor(user: IUserUpdateInput) {
    this.name = user.name;
  }
}
