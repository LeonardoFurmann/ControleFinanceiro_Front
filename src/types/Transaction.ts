export interface Transaction {
  date: string;
  amount: number;
  transactionTypeId: number;
  categoryId: number;
  paymentMethodId: number;
  observation: string | null;
}
