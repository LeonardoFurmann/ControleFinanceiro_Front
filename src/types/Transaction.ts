export interface Transaction {
  date: string;
  amount: number;
  transactionType: number;
  category: number;
  paymentMethod: number;
  observation: string | null;
}
