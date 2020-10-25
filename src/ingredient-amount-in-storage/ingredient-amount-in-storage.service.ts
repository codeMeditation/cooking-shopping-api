import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSearchQuery } from './dto/user-search-query';
import { IngredientAmountInStorageEntity } from './ingredient-amount-in-storage.entity';
import { IngredientAmountInStorageCreateUpdateDto } from './dto/ingredient-amount-in-storage-create-update.dto';

@Injectable()
export class IngredientAmountInStorageService {
  public constructor(
    @InjectRepository(IngredientAmountInStorageEntity)
    private readonly repository: Repository<IngredientAmountInStorageEntity>,
  ) { }

  public async search(userSearchQuery: UserSearchQuery) {
    const dbQuery: FindManyOptions<IngredientAmountInStorageEntity> = { relations: [ 'ingredient' ] };

    dbQuery['where'] = {};

    if (userSearchQuery.amount !== undefined) {
      dbQuery.where['amount'] = userSearchQuery.amount;
    }

    return await this.repository.findAndCount(dbQuery);
  }

  public async findById(id: string): Promise<IngredientAmountInStorageEntity> {
    const searchResult = await this.repository.findOne(id, { relations: [ 'ingredient' ] });
    if (searchResult === undefined) {
      throw new NotFoundException(`IngredientAmountInStorage with ID ${id} cannot be found`);
    }
    return searchResult;
  }

  public async create(
    ingredientAmountInStorage: IngredientAmountInStorageCreateUpdateDto
  ): Promise<IngredientAmountInStorageEntity> {
    return await this.repository.save({
      amount: ingredientAmountInStorage.amount,
      ingredient: ingredientAmountInStorage.ingredientId.map((id) => ({ id })),
    });
  }

  public async update(
    id: string,
    ingredientAmountInStorage: IngredientAmountInStorageCreateUpdateDto
  ): Promise<IngredientAmountInStorageEntity> {
    const exisitngIngredientAmount = await this.repository.findOne(id, { select: [ 'id' ] });
    if (exisitngIngredientAmount === undefined) {
      throw new NotFoundException(`IngredientAmountInStorage with ID ${id} cannot be found`);
    }
    return await this.repository.save({
      id,
      amount: ingredientAmountInStorage.amount,
      ingredient: ingredientAmountInStorage.ingredientId.map((id) => ({ id })),
    });
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`IngredientAmountInStorage with ID ${id} cannot be found`);
    }
    await this.repository.delete(id);
  }
}
