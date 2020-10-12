import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserSearchQuery } from '../Ingredients/dto/user-search-query';
import { ShopCreateUpdateDto } from './dto/shop-create-update.dto';
import { Shop } from './shop.entity';

@Injectable()
export class ShopService {
  public constructor(
    @InjectRepository(Shop)
    private readonly repository: Repository<Shop>,
  ) { }

  public async search(userSearchQuery: UserSearchQuery) {
    const dbQuery: FindManyOptions<Shop> = {};

    dbQuery['where'] = {};

    if (userSearchQuery.name !== undefined) {
      dbQuery.where['name'] = userSearchQuery.name;
    }

    return await this.repository.findAndCount(dbQuery);
  }

  public async findById(id: string): Promise<Shop> {
    const searchResult = await this.repository.findOne(id, { relations: ['ingredients'] });
    if (searchResult === undefined) {
      throw new NotFoundException(`Shop with ID ${id} cannot be found`);
    }
    return searchResult;
  }

  public async create(shop: ShopCreateUpdateDto): Promise<Shop> {
    try {
      return await this.repository.save({
        name: shop.name,
        ingredients: shop.ingredientIds.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(`Shop with name ${shop.name} already exists`);
      }
      throw error;
    }
  }

  public async update(id: string, shop: ShopCreateUpdateDto): Promise<Shop> {
    const exisitngRecipe = await this.repository.findOne(id, { select: ['id'] });
    if (exisitngRecipe === undefined) {
      throw new NotFoundException(`Shop with ID ${id} cannot be found`);
    }

    try {
      return await this.repository.save({
        id,
        name: shop.name,
        ingredients: shop.ingredientIds.map((id) => ({ id })),
      });
    } catch (error) {
      if (error.message.includes('ER_DUP_ENTRY')) {
        throw new ConflictException(`Shop with name ${shop.name} already exists`);
      }
      throw error;
    }
  }

  public async delete(id: string): Promise<void> {
    const deleteResult = await this.repository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Shop with ID ${id} cannot be found`);
    }
    await this.repository.delete(id);
  }
}
