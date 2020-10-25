import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientAmountEntity } from './ingredient-amount.entity';
import { IngredientAmountCreateUpdateDto } from './dto/ingredient-amount-create-update.dto';
import { UserSearchQuery } from './dto/user-search-query';

@Injectable()
export class IngredientAmountService {
  public constructor(
    @InjectRepository(IngredientAmountEntity)
    private readonly repository: Repository<IngredientAmountEntity>,
  ) { }

  public async search(userSearchQuery: UserSearchQuery) {
    const dbQuery: FindManyOptions<IngredientAmountEntity> = { relations: ['ingredient'] };

    dbQuery['where'] = {};

    if (userSearchQuery.amount !== undefined) {
      dbQuery.where['amount'] = userSearchQuery.amount;
    }

    return await this.repository.findAndCount(dbQuery);
  }

  public async findById(id: string): Promise<IngredientAmountEntity> {
    const searchResult = await this.repository.findOne(id, { relations: ['ingredient'] });
    if (searchResult === undefined) {
      throw new NotFoundException(`IngredientAmount with ID ${id} cannot be found`);
    }
    return searchResult;
  }

  public async create(ingredientAmount: IngredientAmountCreateUpdateDto): Promise<IngredientAmountEntity> {
    return await this.repository.save({
      amount: ingredientAmount.amount,
      ingredient: ingredientAmount.ingredientId.map((id) => ({ id })),
    });
  }

  public async update(id: string, ingredientAmount: IngredientAmountCreateUpdateDto): Promise<IngredientAmountEntity> {
    const exisitngIngredientAmount = await this.repository.findOne(id, { select: ['id'] });
    if (exisitngIngredientAmount === undefined) {
      throw new NotFoundException(`IngredientAmount with ID ${id} cannot be found`);
    }
    return await this.repository.save({
      id,
      amount: ingredientAmount.amount,
      ingredient: ingredientAmount.ingredientId.map((id) => ({ id })),
    });
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Ingredient with ID ${id} cannot be found`);
    }
    await this.repository.delete(id);
  }
}
