import { instance } from '@/api/api.interceptor';
import { IOrder } from '@/types/order.interface';

const Orders = 'Orders';

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
};

type TypeData = {
  status?:EnumOrderStatus
  items: {
    quantity: number
    price: number
    productId: number
  }[]
}

export const OrderService = {
  async getAll() {
    return await instance<IOrder[]>({
      url: Orders,
      method: 'GET',
    });
  },

  async place(data: TypeData){
    return instance<{confirmation:{confirmation_url:string}}>({
      url: Orders,
      method:'POST',
      data
    })
  }
};
