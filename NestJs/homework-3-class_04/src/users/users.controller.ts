import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUser, UpdateUser } from 'src/common/types/users.interface';

// localhost:3000/users
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
    @Post()
    create(@Body() body: CreateUser) {
        if (!body.name) throw new BadRequestException('Name is required.');
        if (!body.email) throw new BadRequestException('Email is required.');
        if (!body.role) throw new BadRequestException('Role  is required.');

        if (!body.email.includes('@')) {
            throw new BadRequestException('Invalid email format.');
        }

        return this.usersService.create(body);
    }
    @Get('/:id')
    findOne(@Param('id', ParseIntPipe) id: number) {         // ParseIntPipe we use to transform the id from string to number
        return this.usersService.findOne(id);
    }
    @Get('/posts/:id')
    findOneWithPosts(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOneWithPosts(id);
    }
    @Put('/:id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUser) {
        return this.usersService.update(id, body);
    }
    @Delete('/:id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }
}
