import { IsNumber, IsOptional } from 'class-validator';

export class UserSearchQuery {
  @IsNumber()
  @IsOptional()
  public amount?: number;
}
