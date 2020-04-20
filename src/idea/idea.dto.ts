import { IsString, Length, IsNotEmpty } from 'class-validator';

import { IUserResponseObject } from 'src/user/user.dto';

export class IdeaDTO {
  @IsString()
  @Length(3, 100)
  @IsNotEmpty()
  readonly idea: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 200)
  readonly description: string;
}

export interface IIdeaResponseObject {
  id?: string;
  createdDate: Date;
  updatedDate: Date;
  idea: string;
  description: string;
  author?: IUserResponseObject;
  upvotes?: number;
  downvotes?: number;
}
