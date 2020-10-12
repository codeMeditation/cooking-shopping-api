import {
  Controller, Post, HttpCode, HttpStatus, Body, Delete, Param, Get, Query, Put
} from '@nestjs/common';
import { ShopCreateUpdateDto } from './dto/shop-create-update.dto';
import { UserSearchQuery } from './dto/user-search-query';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@Controller('/api/cookingAndShopping/shops')
export class ShopController {
  public constructor(private readonly service: ShopService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async findAll(@Query() query: UserSearchQuery) {
    const shopSearchQuery = {
      name: query.name,
    };

    return await this.service.search(shopSearchQuery);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  public findById(@Param('id') id: string): Promise<Shop> {
    return this.service.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public create(@Body() shop: ShopCreateUpdateDto): Promise<Shop> {
    return this.service.create(shop);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  public update(@Param('id') id: string, @Body() shop: ShopCreateUpdateDto): Promise<Shop> {
    return this.service.update(id, shop);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
