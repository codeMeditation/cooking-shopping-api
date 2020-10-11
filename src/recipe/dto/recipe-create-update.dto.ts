import {
  IsString, IsNotEmpty, ArrayUnique, IsUUID, IsOptional
} from 'class-validator';

export class RecipeCreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public title?: string;

  @IsString()
  @IsOptional()
  public text?: string;

  @ArrayUnique()
  @IsUUID(4, { each: true })
  public ingredientIds: string[]; 
}
