import { Module } from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { envValidationSchema } from 'src/config/envValidation.config';
import { dataSourceOptions } from 'src/config/database.config';

console.log(process.env.DB_NAME);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    RecipeModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
