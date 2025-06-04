import { Role } from './../common/types/role.enum';
import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
    

@Entity('users')
export class User{

    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({
        description:'User ID',
        example:'123e4567-e89b-12d3-a456-426614174000',
    })
    id: string;


    @Column({unique: true})
    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
        uniqueItems:true,
    })
    email: string;


    @Column()
    password: string;
    
    @Column({
        type:'enum',
        enum: Role,
        nullable: false,
        default: Role.Visitor, 

    })
    role:Role;           // to define later ROLE

    @Column({
        name: 'refresh_token',
        nullable: true,
        type:'text',
    })
    refreshToken: string | null;

    @CreateDateColumn({
        name: 'created_at'
    })
    @ApiProperty({
        description: 'User creation timestamp'
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
    })
    @ApiProperty({
        description: 'User last update timestamp'
    })
    updatedAt: Date;


}