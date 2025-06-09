import { ApiProperty } from "@nestjs/swagger";

import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Role } from "src/common/types/role.enum";

export class LoginDto{
    @IsEmail()
    @ApiProperty({
        type: String,
        example: 'john.doe@test.com'
    })
    email: string;


    
    @IsString()
    @ApiProperty({
        type: String,
        example: 'Pas$word123'
    })
    password: string;
}

export class RegisterDto {
    @IsEmail()
    @ApiProperty({
        type: String,
        example: 'john.doe@test.com'
    })
    email: string;
    @IsString()
    @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
    @ApiProperty({
        type: String,
        example: 'Pas$word123'
    })
     password: string;


     @IsEnum(Role)
     @IsNotEmpty()
     @ApiProperty({
        description: 'User role',
        example: Role.Visitor,
     })
     role: Role;
}