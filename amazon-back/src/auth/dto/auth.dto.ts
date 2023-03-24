import { IsString, IsEmail, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password must be at least 6 charecters length',
  })
  @IsString()
  password: string;
}
