import { IsString, Length, IsNotEmpty } from 'class-validator';

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
