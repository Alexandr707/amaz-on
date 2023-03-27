import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes
} from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from './dto/review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UsePipes(new ValidationPipe())
  @Get(':productId')
  async getAll(@Param('productId') productId: string) {
    return this.reviewService.getAll(+productId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('leave/:productId')
  @Auth()
  async leaveReview(
    @CurrentUser('id') id: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: string,
  ) {
    return this.reviewService.create(id, dto, +productId);
  }

  @Get('avarage-by-product/:productId')
  async getAverageByproduct(@Param('productId') productId:string){
    return this.reviewService.getAverageByProductId(+productId)
  }
}
