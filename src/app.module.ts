import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientAmountInStorageEntity } from './ingredient-amount-in-storage/ingredient-amount-in-storage.entity';
import { IngredientAmountInStorageModule } from './ingredient-amount-in-storage/ingredient-amount-in-storage.module';
import { IngredientAmountEntity } from './ingredient-amount/ingredient-amount.entity';
import { IngredientAmountModule } from './ingredient-amount/ingredient-amount.module';
import { IngredientEntity } from './ingredient/ingredient.entity';
import { IngredientModule } from './ingredient/ingredient.module';
import { RecipeEntity } from './recipe/recipe.entity';
import { RecipeModule } from './recipe/recipe.module';

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
        entities: [ IngredientEntity, IngredientAmountEntity, IngredientAmountInStorageEntity, RecipeEntity ],
        synchronize: true,
      }),
    }),
    IngredientModule,
    IngredientAmountModule,
    IngredientAmountInStorageModule,
    RecipeModule,
  ],
})
export class AppModule { }
