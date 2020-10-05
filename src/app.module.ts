import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from './Ingredients/ingredient.entity';
import { IngredientModule } from './Ingredients/ingredient.module';
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
        entities: [ IngredientEntity, RecipeEntity ],
        synchronize: true,
      }),
    }),
    IngredientModule,
    RecipeModule,
  ],
})
export class AppModule {}
