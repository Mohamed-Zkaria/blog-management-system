import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Repository } from 'typeorm';
import { UserService } from 'src/users/users.service';

@Module({
  providers: [BlogsService, Repository, UserService],
  controllers: [BlogsController]
})
export class BlogsModule {}
