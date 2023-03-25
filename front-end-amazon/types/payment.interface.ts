interface Amount {
  value: string;
  currency: string;
}

interface Recipient {
  account_id: string;
  gateway_id: string;
}

interface PaymanetMethod {
  type: string;
  id: string;
  saved: string;
}

interface Confirmation {
  type: string;
  return_url: string;
  confirmation_url: string;
}

export interface IPaymentResponse {
  id: string;
  status: string;
  amount: Amount;
  recipient: Recipient;
  payment_method: PaymanetMethod;
  created_at: Date;
  confirmation: Confirmation;
}
