import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

type DatePickerInputProps = {
  label?: string;
  className?: string;
  placeholder?: string;
};

const DatePickerInput = ({
  label,
  className,
  placeholder = "",
}: DatePickerInputProps) => {
  const [date, setDate] = React.useState<Date | undefined>();

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-900">
          {label}
        </label>
      )}

      <div className="mt-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="
                w-full
                flex
                items-center
                justify-between
                rounded-md
                bg-white-100
                hover:bg-white-200
                px-3
                py-5
                text-sm
                text-gray-900
                outline
                outline-1
                outline-gray-300
                focus:outline-2
                focus:-outline-offset-2
                focus:outline-mint-500
                cursor-pointer
              "
            >
              <span className={date ? "text-gray-900" : "text-gray-400"}>
                {date
                  ? format(date, "dd/MM/yyyy", { locale: ptBR })
                  : placeholder}
              </span>

              <ChevronDownIcon className="h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            side="bottom"
            sideOffset={4}
            className="
              w-auto
              rounded-md
              border
              border-gray-200
              bg-white
              p-2
              shadow-md
            "
          >
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default DatePickerInput;
