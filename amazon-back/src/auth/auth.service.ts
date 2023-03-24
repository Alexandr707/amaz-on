import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import { PrismaService } from '../prisma.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: AuthDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (oldUser) throw new BadRequestException('User olredy exist');

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: faker.name.firstName(),
        avatarURL: faker.image.avatar(),
        phone: faker.phone.number('+7 (###) ###-##-##'),
        password: await hash(dto.password),
      },
    });

    const tokens = await this.issueToken(user.id.toString());

    return { user: this.returnUserFields(user), ...tokens };
  }

  async getNewTokens(refreshToken: string) {
    const result = await this.jwt.verifyAsync<{ id: string }>(refreshToken);

    if (!result) throw new UnauthorizedException('invalid refresh token');

    const user = await this.prisma.user.findUnique({
      where: { id: +result.id },
    });

    const tokens = await this.issueToken(result.id);

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);
    const tokens = await this.issueToken(user.id.toString());

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  private async issueToken(userId: string) {
    const data = { id: userId };

    const accesToken = this.jwt.sign(data, { expiresIn: '1h' });

    const refreshToken = this.jwt.sign(data, { expiresIn: '7d' });

    return { accesToken, refreshToken };
  }

  private returnUserFields(user: User) {
    return {
      id: user.id,
      email: user.email,
    };
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
