import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import { envValidationSchema } from 'src/config/envValidation.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    RecipeModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
