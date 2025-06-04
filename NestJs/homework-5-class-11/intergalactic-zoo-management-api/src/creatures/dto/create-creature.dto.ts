import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DangerLevel } from "src/common/types/dangerLevel.enum";


export class CreatureCreateDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Creature name',
        example: 'Gleepglorp',
        uniqueItems: true,
        type: String,
    })
    name: string;



    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Floofnarian',
        type: String,
    })
    species:string;


    @IsEnum(DangerLevel)
    @IsNotEmpty()
    @ApiProperty({
        description: 'Creature danger level',
        example: DangerLevel.Harmless,
        enum: DangerLevel,
    })
    dangerLevel: DangerLevel;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Tropical Swamp',
        type: String,
    })
    preferredClimate: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        description: 'Creature image URL',
        example: 'https://example.com/image.jpg',
    })
    imageUrl?: string;

}