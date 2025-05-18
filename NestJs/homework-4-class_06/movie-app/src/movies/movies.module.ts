import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movies.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Movie])], // TypeOrmModule for feature
  controllers: [MoviesController],
  providers: [MoviesService]
})
export class MoviesModule {}
