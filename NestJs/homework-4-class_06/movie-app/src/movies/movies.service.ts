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

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}
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

  async update(id: string, body: MovieUpdateDto) : Promise<Movie>{
    const movie = await this.findOne(id);
    const updatedMovie = { ...movie, ...body };
    return this.movieRepository.save(updatedMovie);
  }

  async delete(id:string): Promise<void> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    await this.movieRepository.softDelete(id);
  }
}
