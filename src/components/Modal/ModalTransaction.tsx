import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "../Input/Input";
import { useState } from "react";
import SelectInput from "../Select/SelectInput";
import DatePickerInput from "../DatePicker/DatePickerInput";
import { X } from "lucide-react";

export default function ModalTransaction() {
  const [amount, setAmount] = useState<number>(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-mint-700 hover:bg-mint-900 cursor-pointer">
          Nova Transação
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="[&>button:last-child]:hidden"
      >
        <DialogClose asChild>
          <button
            className="
          absolute
          right-4
          top-4
          rounded-md
          p-2
          cursor-pointer
          text-gray-500
          hover:text-gray-900
          hover:bg-gray-100
          transition
        "
          >
            <X className="h-6 w-6" />
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Cadastrar Transação
          </DialogTitle>
          <DialogDescription className="py-8">
            <div className="flex flex-wrap gap-3">
              <div className="flex justify-between gap-3 w-full">
                <DatePickerInput label="Data" />
                <Input
                  name="valor"
                  type="number"
                  placeholder="Valor"
                  label="Valor"
                  value={amount}
                />
                <SelectInput label="Tipo" values={["Entrada", "Saída"]} />
              </div>
              <div className="flex justify-between gap-3 w-full">
                <SelectInput label="Tipo" values={["Entrada", "Saída"]} />
                <SelectInput label="Tipo" values={["Entrada", "Saída"]} />
              </div>
              <div className="w-full">
                <Input
                  name="observacao"
                  type="text"
                  placeholder="Observação"
                  value={amount}
                  label="Observação"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
