import { IsDate, IsEmail, IsNotEmpty,  } from "class-validator";

import { IUserInput, IUserDbInput } from "../../interfaces";
import { UserRoles } from "../../interfaces";

export class UserDbInputDTO implements IUserDbInput {
  @IsNotEmpty()
  Username: string;

  @IsNotEmpty()
  @IsEmail()
  Email: string;

  @IsNotEmpty()
  Name: string;

  @IsNotEmpty()
  @IsDate()
  JoinDate: Date;
  
  @IsNotEmpty()
  Role: UserRoles;

  constructor(user: IUserInput) {
    this.Username = user.Username;
    this.Email = user.Email;
    this.Name = user.Name;
    this.JoinDate = new Date;
    this.Role = UserRoles.USER;
  }
}
