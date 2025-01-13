import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty } from "class-validator";

export class CreateBlogsDTO {

    @ApiProperty({
        example: 'Sun light and its effects',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(3)
    title: string;

    @ApiProperty({
        example: 'Sun light exposure and its beneifits',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(10)
    description: string;

    @ApiProperty({
        example: 'Sun',
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @Length(3)
    tags: string;
}

export class UpdateBlogsDTO {

    @ApiProperty({
        example: 'Sun light and its effects',
        required: false
    })
    @IsString()
    @Length(3)
    title?: string;

    @ApiProperty({
        example: 'Sun light exposure and its beneifits',
        required: false
    })
    @IsString()
    @Length(10)
    description?: string;

    @ApiProperty({
        example: 'Sun',
        required: false
    })
    @IsString()
    @Length(3)
    tags?: string;
}