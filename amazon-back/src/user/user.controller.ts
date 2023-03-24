import { UserDto } from './dto/user.dto';
import { ValidationPipe } from '@nestjs/common/pipes';
import {
  Controller,
  Get,
  Put,
  Patch,
  Param,
  UsePipes,
  HttpCode,
  Body,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put('profile')
  async updateProfile(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto);
  }

  @HttpCode(200)
  @Auth()
  @Patch('profile/favorites/:productId')
  async toogleFavorite(
    @CurrentUser('id') id: number,
    @Param('productId') productid: string,
  ) {
    return this.userService.toogleFavorite(id, +productid);
  }
}
