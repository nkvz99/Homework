import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { Genre } from 'src/common/types/genre.enum';
import { MovieSortBy } from 'src/common/types/movie-sort-by.enum';
import { SortDirection } from 'src/common/types/sort-driection.enum';

export class MovieQueryDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
    })
    searchTerm?: string;

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
    })
    releaseYear?: number;

    @IsOptional()
    @IsArray()
    @IsEnum(Genre, { each: true })
    @ApiPropertyOptional({
        isArray: true,
        enum: Genre,
        enumName: 'Genre',
        example: ['Action', 'Comedy']
    })
    @Transform(({ value }) => {
        // Handle different formats of incoming data
        if (value === undefined || value === null) {
            return null;
        }
        // If already an array, return it
        if (Array.isArray(value)) {
            return value;
        }
        // If a single string, convert to array
        return [value];
    })
    @Type(() => String)
    genre?: Genre[];

    @IsNumber()
    @Type(() => Number)
    @IsOptional()
    @ApiPropertyOptional({
        type: Number,
    })
    rating?: number;

    @IsOptional()
    @IsEnum(MovieSortBy)
    @ApiPropertyOptional({
        enum: MovieSortBy,
        enumName: 'MovieSortBy',
        default: MovieSortBy.Rating,
    })
    sortBy?: MovieSortBy = MovieSortBy.Rating;

    @IsOptional()
    @IsEnum(SortDirection)
    @ApiPropertyOptional({
        enum: SortDirection,
        enumName: 'SortDirection',
        default: SortDirection.DESC,
    })
    sortDir?: SortDirection = SortDirection.DESC;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional({
        type: Number,
        default: 1,
    })
    page?: number = 1;

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional({
        type: Number,
        default: 10,
    })
    pageSize?: number = 10;
}
