import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from './datasource/typeorm.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    TypeOrmModule,
    UsersModule,
    BlogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
