
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";
import { DangerLevel } from "src/common/types/dangerLevel.enum";


export class CreatureUpdateDto {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({
        description: 'Creature name',
        example: 'Gleepglorp',
        uniqueItems: true,
        type: String,
    })
    name?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({
        example: 'Floofnarian',
        type: String,
    })
    species?: string;

    @IsOptional()
    @IsEnum(DangerLevel)
    @ApiPropertyOptional({
        description: 'Creature danger level',
        example: DangerLevel.Harmless,
        enum: DangerLevel,
    })
    dangerLevel?: DangerLevel;


    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({
        example: 'Tropical Swamp',
        type: String,
    })
    preferredClimate?: string;

    // here we allow user to update the image URL, but it is not required and only with a valid URL format
    @IsString()
    @IsUrl()
    @IsOptional()
    @ApiPropertyOptional({
        type: String,
        description: 'Creature image URL',
        example: 'https://example.com/image.jpg',
    })
    imageUrl?: string;

}
