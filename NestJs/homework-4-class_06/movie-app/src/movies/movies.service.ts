import { PaginatedResponseDto } from './../common/dto/paginated-response.dto';
import { MovieUpdateDto } from './dtos/movie-update.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movies.entity';
import { Repository } from 'typeorm';
import { MovieCreateDto } from './dtos/movie-create.dto';
import { MovieQueryDto } from './dtos/movie-query.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) { }
  async create(body: MovieCreateDto): Promise<Movie> {
    try {
      const movie = this.movieRepository.create(body);
      return await this.movieRepository.save(movie);
    } catch (error: any) {
      throw new BadRequestException(error.details);
    }
  }

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async filterMovies({
    searchTerm,
    releaseYear,
    genre,
    rating,
    sortBy,
    sortDir,
    page = 1,
    pageSize =10,
  }: MovieQueryDto): Promise<PaginatedResponseDto<Movie>>{
    const queryBuilder = this.movieRepository.createQueryBuilder('movie');

    if (searchTerm) {
      queryBuilder.andWhere('movie.title ILIKE :searchTerm', {
        searchTerm: `%${searchTerm}%`,
      });
    }

    if (releaseYear) {
      queryBuilder.andWhere('movie.releaseYear = :releaseYear', {
        releaseYear,
      });
    }

    if (genre) {
      queryBuilder.andWhere('movie.genre && :genre', { genre });
    }

    if (rating) {
      queryBuilder.andWhere('movie.rating = :rating', { rating });
    }

    if (sortBy) {
      queryBuilder.orderBy(`movie.${sortBy}`, sortDir);
    }

    const skip = (page - 1) * pageSize;
    queryBuilder.skip(skip).take(pageSize);
    const [movies, total] = await queryBuilder.getManyAndCount();

    return {
      payload: movies,
      total,
    };
    
  }

  async findOne(id: string): Promise<Movie> {

    // 1. Validate UUID format
    if (id.length !== 36 || id.split('-').length !== 5) {
      throw new BadRequestException(`Invalid UUID: ${id}`);
    }

    const movie = await this.movieRepository.findOneBy({ id });

    // 2. Check if movie exists with valid UUID
    // 3. If not, throw NotFoundException
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }

    return movie;
  }

  async update(id: string, body: MovieUpdateDto): Promise<Movie> {
    const movie = await this.findOne(id);
    const updatedMovie = { ...movie, ...body };
    return this.movieRepository.save(updatedMovie);
  }

  async delete(id: string): Promise<void> {
    await this.findOne(id);
    await this.movieRepository.softDelete(id);
  }
}
