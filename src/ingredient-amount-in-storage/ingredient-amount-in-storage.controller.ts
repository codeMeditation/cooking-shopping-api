import {
  Controller, Post, HttpCode, HttpStatus, Body, Delete, Param, Get, Query, Put,
} from '@nestjs/common';
import { IngredientAmountInStorageCreateUpdateDto } from './dto/ingredient-amount-in-storage-create-update.dto';
import { UserSearchQuery } from './dto/user-search-query';
import { IngredientAmountInStorageEntity } from './ingredient-amount-in-storage.entity';
import { IngredientAmountInStorageService } from './ingredient-amount-in-storage.service';

@Controller('/api/cookingAndShopping/ingredientAmountInStorage')
export class IngredientAmountInStorageController {
  public constructor(private readonly service: IngredientAmountInStorageService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query() query: UserSearchQuery) {
    const ingredientAmountInStorageSearchQuery = {
      amount: query.amount,
    };

    return await this.service.search(ingredientAmountInStorageSearchQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public findById(@Param('id') id: string): Promise<IngredientAmountInStorageEntity> {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(
    @Body() ingredient: IngredientAmountInStorageCreateUpdateDto
  ): Promise<IngredientAmountInStorageEntity> {
    return this.service.create(ingredient);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  public update(
    @Param('id') id: string,
    @Body() ingredient: IngredientAmountInStorageCreateUpdateDto
  ): Promise<IngredientAmountInStorageEntity> {
    return this.service.update(id, ingredient);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
