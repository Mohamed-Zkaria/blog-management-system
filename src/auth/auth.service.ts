
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from 'src/users/users.types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async signIn(user: CreateUserDTO): Promise<{ access_token: string }> {
        const currentUser = await this.usersService.findOne(user.email);
        const isMatch = await bcrypt.compare(user.password, currentUser.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }
        const payload = { email: currentUser.email, role: user.role };
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }


    async signUp(user: CreateUserDTO) {
        const salt = await bcrypt.genSalt(parseInt(this.configService.get("saltRounds")));
        const hash = await bcrypt.hash(user.password, salt);
        return await this.usersService.createUSer({ ...user, password: hash });
    }
}
