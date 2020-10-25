import { ArrayUnique, IsNotEmpty, IsNumber } from 'class-validator';

export class IngredientAmountInStorageCreateUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  public amount: number;

  @ArrayUnique()
  public ingredientId: string[];
}
