import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BlogsEntity } from './blogs.entity';
import { CreateBlogsDTO, UpdateBlogsDTO } from './blogs.types';
import { Like } from "typeorm"

@Injectable()
export class BlogsService {
    private blogRepository;
    constructor(private dataSource: DataSource) {
        this.blogRepository = dataSource.getRepository(BlogsEntity);
    }

    async createBlog(createBlogDto: CreateBlogsDTO) {
        const blog = await this.blogRepository.create(createBlogDto);
        return await this.blogRepository.save(blog)
    }

    async getBlog(id: number) {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
            throw new NotFoundException(`No blogs found with id: ${id}`);
        }
        return blog;
    }

    async updateBlog(id: number, newBlog: UpdateBlogsDTO) {
        const currentBlog = await this.blogRepository.findOneBy({ id });
        if (!currentBlog) {
            throw new NotFoundException(`No blogs found with id: ${id}`);
        }

        return await this.blogRepository.save({ ...currentBlog, ...newBlog });
    }

    async deleteBlog(id: number) {
        const blog = await this.blogRepository.findOneBy({ id });
        if (!blog) {
            throw new NotFoundException(`No blogs found with id: ${id}`);
        }
        return await this.blogRepository.remove(blog);
    }

    async listBlogs(queryFilter) {
        const { page = 1, perPage = 10, tags } = queryFilter;
        const limit = parseInt(perPage);
        const offset = (parseInt(page) - 1) * limit;
        return await this.blogRepository.find({ skip: offset, take: limit, where: { tags: Like(`%${tags}%`) } })
    }
}
