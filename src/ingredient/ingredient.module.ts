import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientController } from './ingredients.controller';
import { IngredientEntity } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientEntity])],
  providers: [IngredientService],
  controllers: [IngredientController],
  exports: [IngredientService],
})
export class IngredientModule { }
