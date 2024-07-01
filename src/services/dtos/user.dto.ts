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
  Username: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: UserRoles;

  constructor(user: IUserInput) {
    this.Username = user.Username;
    this.Email = user.Email;
    this.Name = user.Name;
    this.JoinDate = new Date();
    this.Role = UserRoles.USER;
  }
}

export class UserResponseDTO implements IUserResponse {
  Username: string;
  Name: string;
  Email: string;
  _links: HATEOAS_Types;

  constructor(user: IUser) {
    this.Username = user.Username;
    this.Name = user.Name;
    this.Email = user.Email;
    this._links = {
      self: {
        href: `/api/blogs/${user.Id}`,
        method: 'GET',
      },
      update: {
        href: `/api/blogs/${user.Id}`,
        method: 'PATCH',
      },
      delete: {
        href: `/api/blogs/${user.Id}`,
        method: 'DELETE',
      },
    };
  }
}

export class UserUpdateDBInputDTO implements IUserUpdateDbInput {
  Name: string;

  constructor(user: IUserUpdateInput) {
    this.Name = user.Name;
  }
}
