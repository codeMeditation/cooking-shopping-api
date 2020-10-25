import {
  Controller, Post, HttpCode, HttpStatus, Body, Param, Get, Query, Delete, Put
} from '@nestjs/common';
import { RecipeCreateUpdateDto } from './dto/recipe-create-update.dto';
import { UserSearchQuery } from './dto/user-search-query';
import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('/api/cookingAndShopping/recipes')
export class RecipeController {
  public constructor(private readonly service: RecipeService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query() query: UserSearchQuery) {
    const recipeSearchQuery = {
      name: query.name,
    };

    return await this.service.search(recipeSearchQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public findById(@Param('id') id: string): Promise<RecipeEntity> {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() ingredient: RecipeCreateUpdateDto): Promise<RecipeEntity> {
    return this.service.create(ingredient);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  public update(@Param('id') id: string, @Body() recipe: RecipeCreateUpdateDto): Promise<RecipeEntity> {
    return this.service.update(id, recipe);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
