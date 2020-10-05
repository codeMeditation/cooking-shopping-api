import {
  IsString, IsNumber, IsPositive, IsNotEmpty, IsOptional
} from 'class-validator';

export class IngredientCreateUpdateDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  public source?: string;

  @IsString()
  @IsOptional()
  public brand?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  public price?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public orderQty?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public minimumStock?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  public actualStock?: number;
}
