import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateBlogsDTO, UpdateBlogsDTO } from './blogs.types';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {

    constructor(private readonly blogService: BlogsService) { }

    @Post("")
    async createBlog(@Body() createblogDto: CreateBlogsDTO) {
        return await this.blogService.createBlog(createblogDto)
    }

    @Get(":id")
    async getBlog(@Param("id", ParseIntPipe) id: number) {
        return await this.blogService.getBlog(id)
    }

    @Patch(":id")
    async updateBlog(@Param("id", ParseIntPipe) id: string, @Body() newBlog: UpdateBlogsDTO) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new BadRequestException('Invalid blog ID');
        }
        return await this.blogService.updateBlog(numericId, newBlog);
    }

    @Delete(":id")
    async deleteBlog(@Param("id", ParseIntPipe) id: string) {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            throw new BadRequestException('Invalid blog ID');
        }
        return await this.blogService.deleteBlog(numericId);
    }

    @Get("")
    async listBlogs(
        @Query("tags") tags: string, 
        @Query("page", ParseIntPipe) page: number, 
        @Query("perPage", ParseIntPipe) perPage: number
    ) {
        return await this.blogService.listBlogs({ tags, page, perPage });
    }
}
