import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length, Max, Min } from 'class-validator';
import { Genre } from './../../common/types/genre.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class MovieCreateDto{

    
    @IsString()
    @IsNotEmpty()
    @Length(1, 30)
    @ApiProperty({
        type: String,
        example: 'The lord of the rings',
    })
    title: string;



    @IsString()
    @Length(1, 100)
    @IsNotEmpty()
    @ApiProperty({
        example: 'A hobbit embarks on a quest to destroy a powerful ring.',
        type: String,
    })
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Max(new Date().getFullYear())
    @ApiProperty({
        type: Number,
        example: 2021,
        description: 'Release year (cannot be in the future)'
    })
    releaseYear: number;


    @IsArray()
    @IsEnum(Genre, { each: true })
    @ArrayNotEmpty()
    @ApiProperty({
        example: ['Action', 'Comedy'],
        description: 'Genres of the movie',
        isArray: true,              // so ova mu dava na swagger ARRAY      
        enumName: 'Genre',         // so ova mu dava ime na enumot vo swagger
        enum: Genre,
    })
    genre: Genre[];



    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @Min(1)
    @Max(300)
    @ApiProperty({
        type: Number,    // da probam i so type: integer  // integer dava cel broj bez decimali
        example: 120,
        description: 'Duration in minutes',
    })
    duration: number;



    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(10)
    @ApiProperty({
        type: Number,
        example: 8.5,
        description: 'Rating from 1 to 10',
    })
    rating: number;


    @IsString()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        example: 'https://example.com/poster.jpg',
        description: 'URL of the movie poster',
    })
    poster_url?: string;
}

