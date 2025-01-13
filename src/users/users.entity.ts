import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from './users.types';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        default: RoleEnum.user
    })
    role: RoleEnum;
}