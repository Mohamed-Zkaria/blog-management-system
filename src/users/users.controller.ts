
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './users.types';
import { UserService } from './users.service';

@Controller('users')
export class UsersControllers {

  constructor(private readonly usersService: UserService) { }
}
