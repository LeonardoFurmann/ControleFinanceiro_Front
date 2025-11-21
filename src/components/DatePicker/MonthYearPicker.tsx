import { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { MONTHS_ARRAY } from "../../enum/Months.ts";

type MonthYearPickerProps = {
  month: number;        // 0–11
  year: number;         // ex: 2025
  onChange?: (month: number, year: number) => void;
};

export function MonthYearPicker({ month, year, onChange }: MonthYearPickerProps) {
  
  const [visibleYear, setVisibleYear] = useState(year);

  useEffect(() => {
    setVisibleYear(year);
  }, [year]);

  const monthName = MONTHS_ARRAY[month].full;

  const handleStepUp = () => {
    if (month === 0) {
      onChange?.(11, year - 1);
    } else {
      onChange?.(month - 1, year);
    }
  };

  const handleStepDown = () => {
    if (month === 11) {
      onChange?.(0, year + 1);
    } else {
      onChange?.(month + 1, year);
    }
  };

  const handleSelectMonth = (monthIndex: number) => {
    onChange?.(monthIndex, visibleYear);
  };

  return (
    <>
      <span className="text-gray-800 font-semibold text-3xl">
        {monthName} {year}
      </span>

      <div className="flex flex-col items-center ml-3">
        <button
          className="hover:text-mint-500 hover:font-bold px-3 cursor-pointer"
          onClick={handleStepUp}
        >
          <ChevronUp size={20} />
        </button>

        <button
          className="hover:text-mint-500 hover:font-bold cursor-pointer"
          onClick={handleStepDown}
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <button className="ml-3 hover:text-mint-500 hover:font-bold cursor-pointer">
            <CalendarDays size={28} />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-64 p-4">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisibleYear((prev) => prev - 1)}
            >
              <ChevronLeft />
            </Button>

            <span className="font-semibold text-lg">{visibleYear}</span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVisibleYear((prev) => prev + 1)}
            >
              <ChevronRight />
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {MONTHS_ARRAY.map((m) => {
              const isSelected =
                m.index === month &&
                visibleYear === year;

              return (
                <Button
                  key={m.index}
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handleSelectMonth(m.index)}
                >
                  {m.short}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
