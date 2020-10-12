import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop.controller';
import { Shop } from './shop.entity';
import { ShopService } from './shop.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ Shop ]) ],
  providers: [ ShopService ],
  controllers: [ ShopController ],
  exports: [ ShopService ],
})
export class ShopModule { }
