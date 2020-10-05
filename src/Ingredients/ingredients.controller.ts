import {
  Controller, Post, HttpCode, HttpStatus, Body, Delete, Param, Get, Query, Put
} from '@nestjs/common';
import { GetOneDto } from './dto/get-one.dto';
import { IngredientCreateUpdateDto } from './dto/ingredientCreateUpdateDto';
import { UserSearchQuery } from './dto/user-search-query';
import { IngredientEntity } from './ingredient.entity';
import { IngredientService } from './ingredient.service';

@Controller('/api/cookingAndShopping/ingredients')
export class IngredientController {
  public constructor(private readonly service: IngredientService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query() query: UserSearchQuery) {
    const ingredientSearchQuery = {
      name: query.name,
      source: query.source,
      brand: query.brand
    };

    return await this.service.search(ingredientSearchQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public findById(@Param('id') dto: GetOneDto): Promise<IngredientEntity> {
    return this.service.findById(dto.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() ingredient: IngredientCreateUpdateDto): Promise<IngredientEntity> {
    return this.service.create(ingredient);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  public update(@Param('id') id: string, @Body() ingredient: IngredientCreateUpdateDto): Promise<IngredientEntity> {
    return this.service.update(id, ingredient);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
