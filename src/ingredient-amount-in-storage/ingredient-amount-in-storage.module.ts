import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientAmountInStorageController } from './ingredient-amount-in-storage.controller';
import { IngredientAmountInStorageEntity } from './ingredient-amount-in-storage.entity';
import { IngredientAmountInStorageService } from './ingredient-amount-in-storage.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ IngredientAmountInStorageEntity ]) ],
  providers: [ IngredientAmountInStorageService ],
  controllers: [ IngredientAmountInStorageController ],
  exports: [ IngredientAmountInStorageService ],
})
export class IngredientAmountInStorageModule { }
