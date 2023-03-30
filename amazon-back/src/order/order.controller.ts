import { Body, Controller, Get, HttpCode, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-staatus.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  getAll(@CurrentUser('id') id: number) {
    return this.orderService.getAll(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  @Auth()
  placeOrder(@Body() dto: OrderDto, @CurrentUser('id') id: number) {
    return this.orderService.placeOrder(dto, id);
  }

  @HttpCode(200)
  @Get('status')
  updateStatus(@Body() dto: PaymentStatusDto) {
    return this.orderService.updateStatus(dto);
  }
}
