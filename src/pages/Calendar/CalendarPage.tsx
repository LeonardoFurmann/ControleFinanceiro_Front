import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header.tsx";
import { useApiRequest } from "../../hooks/useApiResquest.ts";
import { transactionAPI } from "../../services/api.ts";
import type { MonthData } from "../../types/MouthData.ts";
import { MonthYearPicker } from "@/components/DatePicker/MonthYearPicker.tsx";
import ModalTransaction from "@/components/Modal/ModalTransaction.tsx";

type Props = {};

const CalendarPage = (props: Props) => {
  const { execute } = useApiRequest();

  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());

  const [amountIn, setAumoutIn] = useState(0);
  const [amountOut, setAumoutOut] = useState(0);
  const [total, setTotal] = useState(0);

  async function getMouthData() {
    const result = await execute<MonthData>(() =>
      transactionAPI.month(year, month + 1)
    );

    if (result.success && result.data) {
      const data = result.data;
      setAumoutIn(data.amountIn);
      setAumoutOut(data.amountOut);
      setTotal(data.total);
      console.log(data);
    }
  }

  useEffect(() => {
    getMouthData();
  }, [month, year]);

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
              <span className="text-gray-700 font-bold text-2xl">Entradas</span>
              <span className="font-bold text-mint-500 text-2xl">
                {amountIn}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-gray-700 font-bold text-2xl">Saídas</span>
              <span className="text-red-400 font-bold text-2xl">
                {amountOut}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-gray-700 font-bold text-2xl">Total</span>
              <span className="text-blue-500 font-bold text-2xl">{total}</span>
            </div>
          </div>
          <div className="bg-background h-18 w-1 mx-8"></div>
          <div>
            <ModalTransaction />
          </div>
        </div>
      </div>
    </section>
  );
};
export default CalendarPage;
