import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeController } from './recipe.controller';
import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ RecipeEntity ]) ],
  providers: [ RecipeService ],
  controllers: [ RecipeController ],
  exports: [ RecipeService ],
})
export class RecipeModule { }
