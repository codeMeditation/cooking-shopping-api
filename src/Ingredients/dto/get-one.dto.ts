import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetOneDto {
  @IsUUID()
  @IsNotEmpty()
  public id: string;
}
