import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeEntity } from './recipe.entity';
import { RecipeCreateUpdateDto } from './dto/recipe-create-update.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { UserSearchQuery } from '../Ingredients/dto/user-search-query';

@Injectable()
export class RecipeService {
  public constructor(
    @InjectRepository(RecipeEntity)
    private readonly repository: Repository<RecipeEntity>,
  ) { }

  public async search(userSearchQuery: UserSearchQuery) {
    const dbQuery: FindManyOptions<RecipeEntity> = {};

    dbQuery['where'] = {};

    if (userSearchQuery.name !== undefined) {
      dbQuery.where['name'] = userSearchQuery.name;
    }

    return await this.repository.findAndCount(dbQuery);
  }

  public async findById(id: string): Promise<RecipeEntity> {
    const searchResult = await this.repository.findOne(id, { relations: ['ingredients'] });
    if (searchResult === undefined) {
      throw new NotFoundException(`Recipe with ID ${id} cannot be found`);
    }
    return searchResult;
  }

  public async create(recipe: RecipeCreateUpdateDto): Promise<RecipeEntity> {
    try {
      return await this.repository.save({
        name: recipe.name,
        ingredients: recipe.ingredientIds.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(`Recipe with name ${recipe.name} already exists`);
      }
      throw error;
    }
  }

  public async update(id: string, recipe: RecipeCreateUpdateDto): Promise<RecipeEntity> {
    const exisitngRecipe = await this.repository.findOne(id, { select: ['id'] });
    if (exisitngRecipe === undefined) {
      throw new NotFoundException(`Recipe with ID ${id} cannot be found`);
    }

    try {
      return await this.repository.save({
        id,
        name: recipe.name,
        ingredients: recipe.ingredientIds.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(`Recipe with name ${recipe.name} already exists`);
      }
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Recipe with ID ${id} cannot be found`);
    }
    await this.repository.delete(id);
  }
}
