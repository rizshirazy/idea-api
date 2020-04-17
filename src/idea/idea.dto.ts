import { IsString, Length } from 'class-validator';

export class IdeaDTO {
  @IsString()
  @Length(3, 100)
  readonly idea: string;

  @IsString()
  readonly description: string;
}
