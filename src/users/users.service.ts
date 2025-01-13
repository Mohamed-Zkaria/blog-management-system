import {
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserEntity } from './users.entity';
import { CreateUserDTO } from './users.types';

@Injectable()
export class UserService {
    private userRepository;
    private logger = new Logger();
    constructor(private dataSource: DataSource) {
        this.userRepository = this.dataSource.getRepository(UserEntity);
    }

    async findOne(email: string) {
        return await this.userRepository.findOneBy({ email })
    }

    async createUSer(createUserDto: CreateUserDTO) {
        try {
            const user = await this.userRepository.create(createUserDto);
            return await this.userRepository.save(user);
        } catch (err) {
            if (err.code == 23505) {
                this.logger.error(err.message, err.stack);
                throw new HttpException('Username already exists', HttpStatus.CONFLICT);
            }
            this.logger.error(err.message, err.stack);
            throw new InternalServerErrorException(
                'Something went wrong, Try again!',
            );
        }
    }
}