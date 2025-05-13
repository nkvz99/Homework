import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePost, UpdatePost } from 'src/common/types/posts.interface';
//localhost:3000/posts
@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get()
    findAll(){
        return this.postsService.findAll();
    }
    @Post()
    create(@Body() body: CreatePost) {
        if(!body.title) throw new BadRequestException('Title is required.');
        if(!body.content) throw new BadRequestException('Content is required.');
        if(!body.authorId) throw new BadRequestException('AuthorId is required.');

        return this.postsService.create(body);
    }
    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.findOne(id);
    }
    @Get('/author/:authorId')
    findByAuthorId(@Param('authorId', ParseIntPipe) authorId: number) {
        return this.postsService.findByAuthorId(authorId);
    }
    @Put('/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdatePost) {
        return this.postsService.update(id, body);
    }
    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.delete(id);
    }
}
