export interface MonthData {
  amountIn: number;
  amountOut: number;
  total: number;
  dashboard: DashboardData;
  transacactions: TransactionResponse[];
}

export interface DashboardData {
  amountByCategory: AmountByCategory[];
  amountByDay: AmountByDay[];
  amountByPaymentMehod: AmountByPaymentMethod[];
  mostAmountCategory: MostAmountCategory;
}

export interface AmountByCategory {
  category: string;
  amount: number;
  type: number; 
}

export interface AmountByDay {
  day: string;
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
  category: string;
}

export interface TransactionResponse {
  id: number;
  date: string;
  day: string;
  amount: string;
  transactionType: number;
  category: string;
  paymentMethod: string;
}
