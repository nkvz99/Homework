import { Role } from 'src/common/types/role.enum';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from 'src/auth/auth.dto';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async register({ email, password, role }: RegisterDto) {
    const existingUser = await this.userRepository.findOneBy({
      email,
    });
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: passwordHash,
      role: role,
    });
    const savedUser = await this.userRepository.save(user);
    const { password: _, ...userWithoutPassword} = savedUser;
    return userWithoutPassword;
  }

  async login({ email, password }: LoginDto) {
    const existingUser = await this.userRepository.findOneBy({
      email,
    });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const arePasswordMatching = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!arePasswordMatching) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokenPayload = {
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const refreshToken = await this.jwtService.signAsync(tokenPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    await this.userRepository.update({id: existingUser.id}, { refreshToken });
    const { password: _,refreshToken: __, ...userWithoutSensitiveData } = existingUser;
    
    return {
      user: userWithoutSensitiveData,
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(token: string) {
  try {
    const payload = await this.jwtService.verifyAsync<{ email: string }>(
      token,
      {
        secret: process.env.JWT_REFRESH_SECRET,
      },
    );

    const existingUser = await this.userRepository.findOneBy({
      email: payload.email,
    });
    
    if (!existingUser) {
      throw new UnauthorizedException('User not found');
    }
    
    if (existingUser.refreshToken !== token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenPayload = {
      sub: existingUser.id,
      email: existingUser.email,
      role: existingUser.role
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: process.env.JWT_EXPIRES_IN,
      secret: process.env.JWT_SECRET,
    });

    
    const newRefreshToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      secret: process.env.JWT_REFRESH_SECRET,
    });

  
    await this.userRepository.update(existingUser.id, {
      refreshToken: newRefreshToken
    });

    const { refreshToken: _, ...userWithoutRefreshToken } = existingUser;
    
    return {
      user: userWithoutRefreshToken,
      accessToken,
      refreshToken: newRefreshToken,
    };
  } catch {
    throw new UnauthorizedException('Invalid refresh token');
  }
}
}
