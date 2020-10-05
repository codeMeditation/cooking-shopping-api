import {
  Controller, Post, HttpCode, HttpStatus, Body, Param, Get, Query, Delete, Put
} from '@nestjs/common';
import { GetOneDto } from '../Ingredients/dto/get-one.dto';
import { UserSearchQuery } from '../Ingredients/dto/user-search-query';
import { RecipeCreateUpdateDto } from './dto/recipe-create-update.dto';
import { RecipeEntity } from './recipe.entity';
import { RecipeService } from './recipe.service';

@Controller('/api/cookingAndShopping/recipe')
export class RecipeController {
  public constructor(private readonly service: RecipeService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query() query: UserSearchQuery) {
    const reviewSearchQuery = {
      name: query.name,
    };

    return await this.service.search(reviewSearchQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public findById(@Param('id') dto: GetOneDto): Promise<RecipeEntity> {
    return this.service.findById(dto.id);
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
