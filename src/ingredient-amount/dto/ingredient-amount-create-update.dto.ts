import { ArrayUnique, IsNotEmpty, IsNumber } from 'class-validator';

export class IngredientAmountCreateUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @ArrayUnique()
  public ingredientId: string[];
}
