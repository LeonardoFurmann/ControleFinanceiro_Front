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
import { useEffect, useState } from "react";
import SelectInput from "../Select/SelectInput";
import DatePickerInput from "../DatePicker/DatePickerInput";
import { X } from "lucide-react";
import type { Category } from "@/types/Category";
import { categoryAPI, paymenteMethodAPI } from "@/services/api";
import { useApiRequest } from "@/hooks/useApiResquest";
import type { PaymentMethod } from "@/types/PaymentMethod";

export default function ModalTransaction() {
  const { execute } = useApiRequest();

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const [amount, setAmount] = useState<number>(0);

  async function getCategories() {
    const result = await execute<Category>(() => categoryAPI.getAll());

    if (result.success && result.data) {
      const data = result.data;
      setCategories(data);
      console.log(data);
    }
  }

   async function getPaymentMethods() {
    const result = await execute<PaymentMethod>(() => paymenteMethodAPI.getAll());

    if (result.success && result.data) {
      const data = result.data;
      setPaymentMethods(data);
      console.log(data);
    }
  }

  useEffect(() => {
    if (!open) return;

    getCategories();
    getPaymentMethods();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                <SelectInput label="Categoria" values={categories.map((e)=> e.description)} />
                <SelectInput label="Métodos de Pagamento" values={paymentMethods.map((e) => e.description)} />
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
