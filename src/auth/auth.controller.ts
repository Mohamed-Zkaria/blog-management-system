import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/users.types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post("/signup")
    async signUp(@Body() user: CreateUserDTO) {
        return await this.authService.signUp(user);
    }

    @Post("/signin")
    async signin(@Body() user: CreateUserDTO) {
        return await this.authService.signIn(user);
    }
}
