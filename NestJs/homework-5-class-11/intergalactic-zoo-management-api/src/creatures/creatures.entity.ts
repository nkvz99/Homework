import { ApiProperty } from "@nestjs/swagger";
import { DangerLevel } from "src/common/types/dangerLevel.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('creatures')
export class Creature {

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description: 'Creature ID',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    id: string; 
    
    @Column({ unique: true })
    @ApiProperty({
        description: 'Creature name',
        example: 'Gleepglorp',
        uniqueItems: true,
    })
    name: string;

    @Column()
    @ApiProperty({
        description: 'Creature species',
        example: 'Floofnarian',
    })
    species: string;

    @Column({
        type: 'enum',
        enum: DangerLevel,
    })
    @ApiProperty({
        description:'Creature danger level',
        example: DangerLevel.Harmless,
        enum: DangerLevel,
    })
    dangerLevel: DangerLevel;


    @Column()
    @ApiProperty({
        example: 'Tropical Swamp',
    })
    preferredClimate: string;

    @Column({
        type:'text',
        nullable: true,
    })
    @ApiProperty({
        description: 'Creature image URL',
        nullable: true,
        name: 'image_url',
    })
    imageUrl?: string | null;


    @CreateDateColumn({
        name: 'created_at',
    })
    @ApiProperty({
        description: 'Creature creation timestamp',
    })
    createdAt: Date;


    @UpdateDateColumn({
        name: 'updated_at',
    })
    @ApiProperty({
        description: 'Creature last update timestamp',
    })
    updatedAt: Date;
}