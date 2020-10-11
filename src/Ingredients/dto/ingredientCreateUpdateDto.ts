import {
  IsString, IsNotEmpty, IsOptional
} from 'class-validator';

export class IngredientCreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public text?: string;
  
  @IsString()
  @IsOptional()
  public brand?: string;  
}
