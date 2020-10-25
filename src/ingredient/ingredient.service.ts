import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IngredientEntity } from './ingredient.entity';
import { IngredientCreateUpdateDto } from './dto/ingredient-create-update.dto';
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

    return await this.repository.findAndCount(dbQuery);
  }

  public async findById(id: string): Promise<IngredientEntity> {
    const searchResult = await this.repository.findOne(id);
    if (searchResult === undefined) {
      throw new NotFoundException(`Ingredient with ID ${id} cannot be found`);
    }
    return searchResult;
  }

  public async create(ingredient: IngredientCreateUpdateDto): Promise<IngredientEntity> {
    try {
      return await this.repository.save({
        name: ingredient.name,
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(`Ingredient with name ${ingredient.name} already exists`);
      }
      throw error;
    }
  }

  public async update(id: string, ingredient: IngredientCreateUpdateDto): Promise<IngredientEntity> {
    const exisitngIngredient = await this.repository.findOne(id, { select: ['id'] });
    if (exisitngIngredient === undefined) {
      throw new NotFoundException(`Ingredient with ID ${id} cannot be found`);
    }

    try {
      return await this.repository.save({
        name: ingredient.name,
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(`Ingredient with ID ${id} already exists`);
      }
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Ingredient with ID ${id} cannot be found`);
    }
    await this.repository.delete(id);
  }
}
