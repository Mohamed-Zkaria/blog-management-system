import { Module } from '@nestjs/common';
import { UsersControllers } from './users.controller';
import { UserService } from './users.service';

@Module({
    controllers: [UsersControllers],
    providers: [UserService],
    exports: [UserService]
})
export class UsersModule {}
