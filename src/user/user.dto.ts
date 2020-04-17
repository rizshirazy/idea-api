import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 25)
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export interface IUserResponseObject {
  id: string;
  username: string;
  createdDate: Date;
  token?: string;
}
