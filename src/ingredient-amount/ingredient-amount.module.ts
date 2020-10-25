import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientAmountController } from './ingredient-amount.controller';
import { IngredientAmountEntity } from './ingredient-amount.entity';
import { IngredientAmountService } from './ingredient-amount.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ IngredientAmountEntity ]) ],
  providers: [ IngredientAmountService ],
  controllers: [ IngredientAmountController ],
  exports: [ IngredientAmountService ],
})
export class IngredientAmountModule { }
