import { MaxLength, IsOptional, IsString} from 'class-validator';

export class UserSearchQuery {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  public name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  public source?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  public brand?: string;
}
