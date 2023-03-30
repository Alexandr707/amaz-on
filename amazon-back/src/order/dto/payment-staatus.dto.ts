class AmountPayment {
  value: string;
  payment: string;
}

class ObjectPayment {
  id: string;
  payment: string;
  amount: AmountPayment;
  payment_method: {
    type: string;
    id: number;
    saved: boolean;
    title: string;
    cart: object;
  };
  creates_at: string;
  expires_at: string;
  description:string
}

export class PaymentStatusDto {
  event:
    | 'payment.succeeded'
    | 'payment.waiting_for_capture'
    | 'payment.canceled'
    | 'refund.succeeded';
  type: string;
  object: ObjectPayment;
}
