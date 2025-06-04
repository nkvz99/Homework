import { Body, Controller, HttpCode, Post, } from '@nestjs/common';
import { UserService } from './users.service';
import { LoginDto, RegisterDto } from 'src/auth/auth.dto';
import { RefreshTokenDto } from 'src/auth/refresh-token.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';


import { TokenPairDto } from 'src/auth/dto/token-pair.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @Post('/register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiCreatedResponse({ description: 'User registered successfully', type: RegisterDto })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    register(@Body() registerDto: RegisterDto) {
        return this.userService.register(registerDto);
    }

    @Post('/login')
    @ApiOperation({ summary: 'Login a user' })
    @ApiOkResponse({description: 'Useer has been sucessfully logged in', type: TokenPairDto })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @HttpCode(200)
    login(@Body() credentials: LoginDto): Promise<TokenPairDto> {
        return this.userService.login(credentials);
    }

    @Post('/refresh')
    @ApiOperation({summary: 'Refresh user token'})
    @ApiOkResponse({ description: 'Token refreshed successfully', type: TokenPairDto })
    @HttpCode(200)
    refresh(@Body() { refreshToken }: RefreshTokenDto): Promise<TokenPairDto> {
        return this.userService.refreshToken(refreshToken);
    }





}
