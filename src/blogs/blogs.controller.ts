import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateBlogsDTO, UpdateBlogsDTO } from './blogs.types';
import { BlogsService } from './blogs.service';
import { AuthGuard } from 'src/auth/auth.gaurd';
import { Role } from 'src/roles/role.enum';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.gaurd';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Blogs api")
@Controller('blogs')
@UseGuards(AuthGuard)
export class BlogsController {

    constructor(private readonly blogService: BlogsService) { }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Editor)
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The record has been successfully created.' })
    @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden access if user is not authenticated' })
    @Post("")
    async createBlog(@Body() createblogDto: CreateBlogsDTO) {
        return await this.blogService.createBlog(createblogDto)
    }
    
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @ApiResponse({ status: HttpStatus.OK, description: 'The record has been retrived successfully' })
    @Get(":id")
    async getBlog(@Param("id", ParseIntPipe) id: number) {
        return await this.blogService.getBlog(id)
    }
    
    @UseGuards(RolesGuard)
    @Roles(Role.Admin, Role.Editor)
    @ApiResponse({ status: HttpStatus.OK, description: 'The record has been updated successfully' })
    @Patch(":id")
    async updateBlog(@Param("id", ParseIntPipe) id: string, @Body() newBlog: UpdateBlogsDTO) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new BadRequestException('Invalid blog ID');
        }
        return await this.blogService.updateBlog(numericId, newBlog);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Delete(":id")
    async deleteBlog(@Param("id", ParseIntPipe) id: string) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new BadRequestException('Invalid blog ID');
        }
        return await this.blogService.deleteBlog(numericId);
    }

    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    @Get("")
    async listBlogs(
        @Query("tags") tags: string,
        @Query("page", ParseIntPipe) page: number,
        @Query("perPage", ParseIntPipe) perPage: number
    ) {
        return await this.blogService.listBlogs({ tags, page, perPage });
    }
}
