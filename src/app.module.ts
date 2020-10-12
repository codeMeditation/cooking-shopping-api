import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './Ingredients/ingredient.entity';
import { IngredientModule } from './Ingredients/ingredient.module';
import { Recipe } from './recipe/recipe.entity';
import { RecipeModule } from './recipe/recipe.module';
import { Shop } from './shop/shop.entity';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `env/${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('MYSQL_DATABASE_HOST'),
        port: configService.get<number>('MYSQL_DATABASE_PORT'),
        username: configService.get<string>('MYSQL_DATABASE_USERNAME'),
        password: configService.get<string>('MYSQL_DATABASE_PASSWORD'),
        database: configService.get<string>('MYSQL_DATABASE_NAME'),
        entities: [ Ingredient, Recipe, Shop ],
        synchronize: true,
      }),
    }),
    IngredientModule,
    RecipeModule,
    ShopModule,
  ],
})
export class AppModule {}
