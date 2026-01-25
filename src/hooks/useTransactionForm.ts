import type { Transaction } from "@/types/Transaction";
import { useState } from "react";
import { useApiRequest } from "./useApiResquest";
import { transactionAPI } from "../services/api";

export function useTransactionForm() {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [date, setDate] = useState<Date | undefined>();
  const [amount, setAmount] = useState<number | "">("");
  const [transactionType, setTransactionType] = useState<number | undefined>(undefined);
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<number | undefined>(undefined);
  const [observation, setObservation] = useState<string>("");

  const { execute } = useApiRequest();

  async function submit() {

    setError("");

    if (!date || !amount || !transactionType || !category || !paymentMethod) {
      setError("Campos obrigatórios não preenchidos");
      return;
    }

    const transaction: Transaction = {
      date: date.toISOString(),
      amount,
      transactionType,
      category,
      paymentMethod,
      observation: observation || null,
    }

    setLoading(true);
    const result = await execute(() => transactionAPI.create(transaction));
    setLoading(false);
    
    console.log(transaction)
    console.log(result)

    if (!result.success) {
      setError(result.message);
    }

    reset();
  }

  function reset() {
    setDate(undefined);
    setAmount("");
    setTransactionType(undefined);
    setCategory(undefined);
    setPaymentMethod(undefined);
    setObservation("");
  }


  return {
    date,
    amount,
    transactionType,
    category,
    paymentMethod,
    observation,
    loading,
    error,
    setDate,
    setAmount,
    setTransactionType,
    setCategory,
    setPaymentMethod,
    setObservation,
    setError,
    submit,
    reset,

  };

}
