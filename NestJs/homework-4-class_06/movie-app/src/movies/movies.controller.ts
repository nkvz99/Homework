import { PaginatedResponseDto } from './../common/dto/paginated-response.dto';
import {  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param,  Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';
import { MovieCreateDto } from './dtos/movie-create.dto';
import { MovieUpdateDto } from './dtos/movie-update.dto';
import { MovieQueryDto } from './dtos/movie-query.dto';



@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }


    @Post()
    @ApiOperation({
        summary: 'Create a new movie',
        description: 'Create a new movie with the provided details.',
    })
    @ApiCreatedResponse({
        description: 'The movie has been successfully created.',
        type: Movie,
    })
    create(@Body() MovieCreateDto: MovieCreateDto): Promise<Movie> {
        return this.moviesService.create(MovieCreateDto);
    }

    @Get()
    @ApiOperation({
        summary: 'Search movies',
    })
    @ApiOkResponse({
        type: PaginatedResponseDto<Movie>,
        description: 'Filtered, paginated and sorted movies'
    })
    searchMovies(
        @Query() query: MovieQueryDto,): Promise<PaginatedResponseDto<Movie>> {
        return this.moviesService.filterMovies(query);
    }

    // THIS IS THE OLD WAY OF DOING IT FOR GET ALL MOVIES ONLY TO CHANGE WITH searchMovies
    // findAll(): Promise<Movie[]> {
    //     return this.moviesService.findAll();
    // }

    @Get('/:id')
    findOne(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.findOne(id);
    }



    @Patch('/:id')
    @ApiOperation({
        summary: 'Update a movie',
    })
    @ApiBadRequestResponse({
        description: 'Invalid UUID format or movie not found.',
    })
    @ApiOkResponse({
        description: 'The movie has been successfully updated.',
        type: Movie,
    })
    update(
        @Body() body: MovieUpdateDto, @Param('id') id: string): Promise<Movie> {
        return this.moviesService.update(id, body);
    }


    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({
        summary: 'Delete a movie',
    })
    @ApiNoContentResponse({
        description: 'The movie has been successfully deleted.',
    })
    async delete(@Param('id') id:string):Promise<void>{
        await this.moviesService.delete(id);
    }


}
