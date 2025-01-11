import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Repository } from 'typeorm';

@Module({
  providers: [BlogsService, Repository],
  controllers: [BlogsController]
})
export class BlogsModule {}
