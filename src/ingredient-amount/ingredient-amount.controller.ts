import {
  Controller, Post, HttpCode, HttpStatus, Body, Delete, Param, Get, Query, Put
} from '@nestjs/common';
import { IngredientAmountCreateUpdateDto } from './dto/ingredient-amount-create-update.dto';
import { UserSearchQuery } from './dto/user-search-query';
import { IngredientAmountEntity } from './ingredient-amount.entity';
import { IngredientAmountService } from './ingredient-amount.service';

@Controller('/api/cookingAndShopping/ingredientAmount')
export class IngredientAmountController {
  public constructor(private readonly service: IngredientAmountService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query() query: UserSearchQuery) {
    const ingredientAmountSearchQuery = {
      amount: query.amount,
    };

    return await this.service.search(ingredientAmountSearchQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public findById(@Param('id') id: string): Promise<IngredientAmountEntity> {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() ingredient: IngredientAmountCreateUpdateDto): Promise<IngredientAmountEntity> {
    return this.service.create(ingredient);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  public update(@Param('id') id: string, @Body() ingredient: IngredientAmountCreateUpdateDto): Promise<IngredientAmountEntity> {
    return this.service.update(id, ingredient);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
