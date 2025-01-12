import { IsString, Length, IsNotEmpty } from "class-validator";

export class CreateBlogsDTO{
    @IsNotEmpty()
    @IsString()
    @Length(3)
    title: string;

    @IsNotEmpty()
    @IsString()
    @Length(10)
    description: string;

    @IsNotEmpty()
    @IsString()
    @Length(3)
    tags: string;
}

export class UpdateBlogsDTO{

    @IsString()
    @Length(3)
    title?: string;

    @IsString()
    @Length(10)
    description?: string;
    
    @IsString()
    @Length(3)
    tags?: string;
}