import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from "class-validator";

export enum RoleEnum {
    user = 'user',
    admin = 'admin',
    editor = 'editor'
}

export class CreateUserDTO {
    @ApiProperty({
        example: 'example@email.com',
        required: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '123!#1asdsdASASA',
        required: true
     })
    @Length(8)
    @IsStrongPassword()
    password: string;

    role?: string;
}