import { IsString, IsNotEmpty, ArrayUnique } from 'class-validator';

export class RecipeCreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ArrayUnique()
  public ingredientAmount: string[];
}
