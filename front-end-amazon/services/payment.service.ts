import { instance } from './../api/api.interceptor';
import { IPaymentResponse } from './../types/payment.interface';

const PAYMENT = 'payment';

export const Paymentervice = {
  async createPayment(amount: number) {
    const data = await instance<IPaymentResponse>({
      url: PAYMENT,
      method: 'POST',
      data: {
        amount,
      },
    });

    return data;
  },
};
