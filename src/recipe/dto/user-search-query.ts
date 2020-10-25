import { MaxLength, IsOptional, IsString } from 'class-validator';

export class UserSearchQuery {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  public name?: string;
}
