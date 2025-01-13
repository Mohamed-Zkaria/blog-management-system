import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from "class-validator";

export enum RoleEnum{
    user = 'user',
    admin = 'admin',
    editor = 'editor'
}

export class CreateUserDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Length(8)
    @IsStrongPassword()
    password: string;

    role?: string;
}