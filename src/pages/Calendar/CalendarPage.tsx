import { useEffect, useState } from "react";
import Header from "../../components/Header/Header.tsx";
import { useApiRequest } from "../../hooks/useApiResquest.ts";
import { transactionAPI } from "../../services/api.ts";
import type {
  AmountByCategory,
  AmountByPaymentMethod,
  MonthData,
  TransactionResponse,
} from "../../types/MouthData.ts";
import { MonthYearPicker } from "@/components/DatePicker/MonthYearPicker.tsx";
import ModalTransaction from "@/components/Modal/ModalTransaction.tsx";
import TableTransactions from "@/components/Table/TableTransactions.tsx";
import BarChartComponent from "@/components/Charts/BarChartComponent.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CalendarPage = () => {
  const { execute } = useApiRequest();

  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());

  const [amountIn, setAumoutIn] = useState(0);
  const [amountOut, setAumoutOut] = useState(0);
  const [total, setTotal] = useState(0);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [editingTransaction, setEditingTransaction] =
    useState<TransactionResponse | null>(null);
  const [amountByCategory, setAmountByCategory] = useState<AmountByCategory[]>([]);
  const [amountByPaymentMethod, setAmountByPaymentMethod] = useState<AmountByPaymentMethod[]>([]);
  const [categoryChartType, setCategoryChartType] = useState("all");
  const [paymentMethodChartType, setPaymentMethodChartType] = useState("all");

  const [open, setOpen] = useState(false);

  async function getMouthData() {
    console.log("getMouthData");

    const result = await execute<MonthData>(() =>
      transactionAPI.month(year, month + 1),
    );

    if (result.success && result.data) {
      const data = result.data;
      setAumoutIn(data.amountIn);
      setAumoutOut(data.amountOut);
      setTotal(data.total);
      setTransactions(data.transactions);

      setAmountByCategory(data.dashboard.amountByCategory);
      setAmountByPaymentMethod(data.dashboard.amountByPaymentMethod);
    }
  }

  useEffect(() => {
    getMouthData();
  }, [month, year]);

  function handleTransactionSucess(): void {
    //setOpen(false);
    getMouthData();
  }

  const filteredAmountByCategory = amountByCategory.filter(
    ({ type }) => categoryChartType === "all" || type === Number(categoryChartType),
  );
  const filteredAmountByPaymentMethod = amountByPaymentMethod.filter(
    ({ type }) =>
      paymentMethodChartType === "all" || type === Number(paymentMethodChartType),
  );

  return (
    <section className="h-screen bg-background flex justify-center">
      <div className="w-[1800px] flex flex-col items-center">
        <Header />
        <div className="w-full bg-card px-10 shadow-md rounded-b-sm my-1 flex items-center h-20">
          <div className="flex items-center flex-1">
            <MonthYearPicker
              month={month}
              year={year}
              onChange={(m, y) => {
                setMonth(m);
                setYear(y);
              }}
            />
          </div>
          <div className="bg-background h-18 w-1 mx-5"></div>

          <div className="flex items-center justify-evenly flex-2">
            <div className="flex-1 flex flex-col items-center">
              <span className="text-foreground font-bold text-2xl">Entradas</span>
              <span className="font-bold text-mint-500 text-2xl">
                {amountIn}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-foreground font-bold text-2xl">Saídas</span>
              <span className="text-red-400 font-bold text-2xl">
                {amountOut}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-foreground font-bold text-2xl">Total</span>
              <span className="text-blue-500 font-bold text-2xl">{total}</span>
            </div>
          </div>
          <div className="bg-background h-18 w-1 mx-8"></div>
          <div>
            <ModalTransaction
              open={open}
              setOpen={setOpen}
              onSuccess={handleTransactionSucess}
            />
          </div>
        </div>
        <section className="w-full">
          <section>
            <TableTransactions
              transactions={transactions}
              onEdit={setEditingTransaction}
            />
          </section>
          <section>
            <div className="bg-card w-full my-4 rounded-md shadow-sm px-2 py-3">
              <div className="flex gap-3 h-auto flex-row">
                <div className="bg-card w-full rounded-md shadow-sm px-2 py-3 h-100">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-semibold">Por categoria</span>
                    <Select value={categoryChartType} onValueChange={setCategoryChartType}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os tipos</SelectItem>
                        <SelectItem value="1">Entrada</SelectItem>
                        <SelectItem value="2">Saída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <BarChartComponent
                    data={filteredAmountByCategory}
                    xKey="category"
                    bars={[{ dataKey: "amount", name: "Valor", fill: "#45BBA5" }]}
                    formatYAxis={(v) => `R$ ${v}`}
                    formatTooltip={(v) => `R$ ${v.toFixed(2)}`}
                  />
                </div>
                <div className="bg-card w-full rounded-md shadow-sm px-2 py-3 h-100">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="font-semibold">Por método de pagamento</span>
                    <Select
                      value={paymentMethodChartType}
                      onValueChange={setPaymentMethodChartType}
                    >
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os tipos</SelectItem>
                        <SelectItem value="1">Entrada</SelectItem>
                        <SelectItem value="2">Saída</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <BarChartComponent
                    data={filteredAmountByPaymentMethod}
                    xKey="paymentMethod"
                    bars={[{ dataKey: "amount", name: "Valor", fill: "#45BBA5" }]}
                    formatYAxis={(v) => `R$ ${v}`}
                    formatTooltip={(v) => `R$ ${v.toFixed(2)}`}
                  />
                </div>
              </div>
            </div>
          </section>
        </section>
        <ModalTransaction
          open={Boolean(editingTransaction)}
          setOpen={(isOpen) => {
            if (!isOpen) setEditingTransaction(null);
          }}
          onSuccess={handleTransactionSucess}
          transaction={editingTransaction ?? undefined}
          showTrigger={false}
        />
      </div>
    </section>
  );
};
export default CalendarPage;
