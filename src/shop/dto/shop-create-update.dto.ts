import {
  IsString, IsNotEmpty, ArrayUnique, IsUUID
} from 'class-validator';

export class ShopCreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ArrayUnique()
  @IsUUID(4, { each: true })
  public ingredientIds: string[]; 
}
