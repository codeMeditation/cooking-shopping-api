import { IsString, IsNotEmpty } from 'class-validator';

export class IngredientCreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;
}
