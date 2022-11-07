import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';

const FRUITS = {
  1: 'apple',
  2: 'banana',
  3: 'orange',
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/fruits')
  createFruit(@Body() body: { name: string }): string {
    return `${body.name} fruit crated`;
  }

  @Get('/fruits')
  getFruits(): typeof FRUITS {
    return FRUITS;
  }

  @Get('/fruits/:id')
  getFruitById(@Param('id') id: string): string {
    return FRUITS[id] || 'Not found';
  }

  @Patch('/fruits/:id')
  updateFruitById(@Param('id') id: string, @Body() body: { name: string }) {
    FRUITS[id] = body.name;
    return FRUITS[id];
  }

  @Delete('/fruits/:id')
  deleteFruitById(@Param('id') id: string) {
    delete FRUITS[id];
    return FRUITS;
  }
}
