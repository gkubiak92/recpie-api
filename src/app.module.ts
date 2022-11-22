import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RecipeModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './database/recipes.db',
      autoLoadEntities: true,
      synchronize: true, // not for production
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
