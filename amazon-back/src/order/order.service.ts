import { Injectable } from '@nestjs/common';
import { EnumOrderStatus } from '@prisma/client';
import * as yooKassa from 'yookassa';
import { PrismaService } from './../prisma.service';
import { returnProductObject } from './../product/return-product.object';
import { OrderDto } from './dto/order.dto';
import { PaymentStatusDto } from './dto/payment-staatus.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        items: {
          include: {
            product: {
              select: returnProductObject,
            },
          },
        },
      },
    });
  }

  async placeOrder(dto: OrderDto, userId: number) {
    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: dto.items,
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const total = dto.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const payment = await yooKassa.createPayment({
      amount: {
        value: total.toFixed(2),
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'refirect',
        return_url: `${process.env['CLIENT_URL']}/thanks`,
      },
      description: `Order #${order.id}`,
    });

    return payment;
  }

  async updateStatus(dto: PaymentStatusDto) {
    if (dto.event === 'payment.waiting_for_capture') {
      const payment = await yooKassa.capturePayment(dto.object.id);
      return payment;
    }

    if (dto.event === 'payment.succeeded') {
      const orderId = Number(dto.object.description.split('#')[1]);

      await this.prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          status: EnumOrderStatus.PAYED,
        },
      });
      return true;
    }

    return true;
  }
}
