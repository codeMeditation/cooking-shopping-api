import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';
import { IngredientCreateUpdateDto } from './dto/ingredientCreateUpdateDto';
import { UserSearchQuery } from './dto/user-search-query';

@Injectable()
export class IngredientService {
  public constructor(
    @InjectRepository(IngredientEntity)
    private readonly repository: Repository<IngredientEntity>,
  ) { }

  public async search(userSearchQuery: UserSearchQuery) {
    const dbQuery: FindManyOptions<IngredientEntity> = {};

    dbQuery['where'] = {};

    if (userSearchQuery.name !== undefined) {
      dbQuery.where['name'] = userSearchQuery.name;
    }

    if (userSearchQuery.source !== undefined) {
      dbQuery.where['source'] = userSearchQuery.source;
    }

    if (userSearchQuery.brand !== undefined) {
      dbQuery.where['brand'] = userSearchQuery.brand;
    }

    return await this.repository.findAndCount(dbQuery);
  }

  public async findById(id: string): Promise<IngredientEntity> {
    const searchResult = await this.repository.findOne(id);
    if (searchResult === undefined) {
      throw new NotFoundException(`Ingredients with ID ${id} cannot be found`);
    }
    return searchResult;
  }

  public async create(ingredient: IngredientCreateUpdateDto): Promise<IngredientEntity> {
    try {
      return await this.repository.save({
        name: ingredient.name,
        source: ingredient.source,
        brand: ingredient.brand,
        price: ingredient.price,
        orderQty: ingredient.orderQty,
        minimumStock: ingredient.minimumStock,
        actualStock: ingredient.actualStock
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(`Ingredients with name ${ingredient.name} already exists`);
      }
      throw error;
    }
  }

  public async update(id: string, ingredients: IngredientCreateUpdateDto): Promise<IngredientEntity> {
    const exisitngReview = await this.repository.findOne(id, { select: [ 'id' ] });
    if (exisitngReview === undefined) {
      throw new NotFoundException(`Ingredient with ID ${id} cannot be found`);
    }

    try {
      return await this.repository.save({
        id,
        name: ingredients.name,
        source: ingredients.source,
        brand: ingredients.brand,
        price: ingredients.price,
        orderQty: ingredients.orderQty,
        minimumQty: ingredients.minimumStock    
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(`Ingredient with name ${ingredients.name} already exists`);
      }
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Ingredients with ID ${id} cannot be found`);
    }
    await this.repository.delete(id);
  }
}
