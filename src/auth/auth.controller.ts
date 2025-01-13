import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/users.types';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags("Auth api")
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.'})
    @Post("/signup")
    async signUp(@Body() user: CreateUserDTO) {
        return await this.authService.signUp(user);
    }

    @Post("/signin")
    async signin(@Body() user: CreateUserDTO) {
        return await this.authService.signIn(user);
    }
}
