import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientController } from './ingredients.controller';
import { Ingredient } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Ingredient ]) ],
  providers: [ IngredientService ],
  controllers: [ IngredientController ],
  exports: [ IngredientService ],
})
export class IngredientModule { }
