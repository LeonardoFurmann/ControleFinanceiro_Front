export interface MonthData {
  amountIn: number;
  amountOut: number;
  total: number;
  dashboard: DashboardData;
  transactions: TransactionResponse[];
}

export interface DashboardData {
  amountByCategory: AmountByCategory[];
  amountByDay: AmountByDay[];
  amountByPaymentMethod: AmountByPaymentMethod[];
  mostAmountCategory: MostAmountCategory;
}

export interface AmountByCategory {
  category: string;
  amount: number;
  type: number; 
}

export interface AmountByDay {
  day: number;
  amount: number;
  type: number;
}

export interface AmountByPaymentMethod {
  paymentMethod: string;
  amount: number;
  type: number;
}

export interface MostAmountCategory {
  amount: number;
  category: string | null;
}

export interface TransactionResponse {
  id: number;
  date: string;
  day: number;
  amount: number;
  transactionType: number;
  categoryId: number;
  category: string;
  paymentMethodId: number;
  paymentMethod: string;
  observation: string | null;
}
