
import { ApiProperty } from "@nestjs/swagger";
import { Genre } from "src/common/types/genre.enum";
import { Check, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Check(`release_year <= date_part('year', CURRENT_DATE)`)
@Check(`"duration" > 0 AND "duration" <= 300`)
@Check(`rating >= 1 AND rating <= 10`)
@Check(`LENGTH("title") > 0 AND LENGTH("title") <= 30`) 
@Check(`LENGTH("description") <= 100 AND LENGTH("description") > 0`)
@Check(`array_length("genre", 1) > 0`)
@Entity('movies')
export class Movie {
    @PrimaryGeneratedColumn('uuid')
    id: string;


    @ApiProperty({
        type: String,
        example: 'The lord of the rings',
    })
    @Column({
        type: 'varchar',
        length: 30,
        nullable: false,
    })
    title: string;


    @ApiProperty({
        type: String,
        example: 'A hobbit embarks on a quest to destroy a powerful ring.',

    })
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false,
    })
    description: string;

    @Column({
        type: "integer",
        nullable: false,
        name: 'release_year',
    })
    @ApiProperty({
        type: Number,
        example: 2021,

    })
    releaseYear: number;


    @ApiProperty({
        enum: Genre,
        example: ['Action', 'Comedy'],
        isArray: true,
    })
    @Column({
        type: 'enum',
        enum: Genre,
        array: true,
        default: [],
    })
    genre: Genre[];


    @ApiProperty({
        type: "integer",
        example: 120,
        description: 'Duration in minutes',
    })
    @Column({
        type: "integer",
        nullable: false,
    })
    duration: number;

    @ApiProperty({
        type: Number,
        example: 5,
        description: 'Rating from 1 to 10',
    })
    @Column({
        type: 'decimal',
        precision:3,
        scale: 1,
        nullable: false,
    })
    rating: number;

    @ApiProperty({
        type: String,
        nullable: true,
        example: 'https://example.com/image.jpg',
    })
    @Column({
        type: "varchar",
        nullable: true,
        name: 'poster_url',
    })
    poster_url: string | null;

    @CreateDateColumn({
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
    })
    deletedAt: Date;
}


