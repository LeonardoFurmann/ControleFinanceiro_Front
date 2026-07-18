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
import {
  categoryAPI,
  paymenteMethodAPI,
  transactionTypeAPI,
} from "@/services/api";
import { useApiRequest } from "@/hooks/useApiResquest";
import type { PaymentMethod } from "@/types/PaymentMethod";
import type { TransactionType } from "@/types/TransactionType";
import { useTransactionForm } from "@/hooks/useTransactionForm";
import Error from "../../components/Helper/Error";
import type { TransactionResponse } from "@/types/MouthData";

type ModalTransactionProps = { 
    open: boolean,
    setOpen: (value: boolean) => void;
    onSuccess: () => void;
    transaction?: TransactionResponse;
    showTrigger?: boolean;
}

const ModalTransaction = ({
  open,
  setOpen,
  onSuccess,
  transaction,
  showTrigger = true,
}: ModalTransactionProps) => {

  const { execute } = useApiRequest();
  const form = useTransactionForm(transaction?.id);
  const isEditing = Boolean(transaction);

  const [categories, setCategories] = useState<Category[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    [],
  );

  async function getCategories() {
    const result = await execute<Category>(() => categoryAPI.getAll());

    if (result.success && result.data) {
      const data = result.data;
      setCategories(data);
    }
  }

  async function getPaymentMethods() {
    const result = await execute<PaymentMethod>(() =>
      paymenteMethodAPI.getAll(),
    );

    if (result.success && result.data) {
      const data = result.data;
      setPaymentMethods(data);
    }
  }

  async function getTransactionTypes() {
    const result = await execute<TransactionType>(() =>
      transactionTypeAPI.getAll(),
    );

    if (result.success && result.data) {
      const data = result.data;
      setTransactionTypes(data);
    }
  }

  useEffect(() => {
    if (!open) return;

    form.clearSuccess();
    form.setError("");

    getCategories();
    getPaymentMethods();
    getTransactionTypes();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (!transaction) {
      form.reset();
      return;
    }

    form.setDate(new Date(transaction.date));
    form.setAmount(Number(transaction.amount));
    form.setTransactionType(transaction.transactionType);
    form.setCategory(
      categories.find((category) => category.description === transaction.category)?.id,
    );
    form.setPaymentMethod(
      paymentMethods.find(
        (paymentMethod) => paymentMethod.description === transaction.paymentMethod,
      )?.id,
    );
    form.setObservation(transaction.observation || "");
  }, [open, transaction, categories, paymentMethods]);

  useEffect(() => {
    if (!form.success) return;

    onSuccess();
    setOpen(false);
    form.clearSuccess();
  }, [form.success, onSuccess, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTrigger && !isEditing && (
        <DialogTrigger asChild>
          <Button className="bg-mint-700 hover:bg-mint-900 cursor-pointer">
            Nova Transação
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        className="bg-white dark:bg-background [&>button:last-child]:hidden"
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
          text-muted-foreground
          hover:text-foreground
          hover:bg-accent
          transition
        "
          >
            <X className="h-6 w-6" />
          </button>
        </DialogClose>

        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            {isEditing ? "Editar Transação" : "Cadastrar Transação"}
          </DialogTitle>
          <DialogDescription className="py-8">
            <div className="flex flex-wrap gap-3">
              <div className="flex justify-between gap-3 w-full">
                <DatePickerInput
                  label="Data"
                  value={form.date}
                  onChange={(value) => form.setDate(value)}
                />
                <Input
                  name="valor"
                  type="number"
                  placeholder="Valor"
                  label="Valor"
                  value={form.amount}
                  onChange={({ target }) => form.setAmount(target.value)}
                  required
                />
                <SelectInput
                  label="Tipo"
                  placeholder="Selecione"
                  value={form.transactionType?.toString()}
                  onChange={(value) => form.setTransactionType(Number(value))}
                  itens={transactionTypes.map((t) => ({
                    label: t.description,
                    value: t.id,
                  }))}
                />
              </div>
              <div className="flex justify-between gap-3 w-full">
                <SelectInput
                  label="Categoria"
                  placeholder="Selecione"
                  value={form.category?.toString()}
                  onChange={(value) => form.setCategory(Number(value))}
                  itens={categories.map((c) => ({
                    label: c.description,
                    value: c.id,
                  }))}
                />
                <SelectInput
                  label="Métodos de Pagamento"
                  placeholder="Selecione"
                  value={form.paymentMethod?.toString()}
                  onChange={(value) => form.setPaymentMethod(Number(value))}
                  itens={paymentMethods.map((p) => ({
                    label: p.description,
                    value: p.id,
                  }))}
                />
              </div>
              <div className="w-full">
                <Input
                  name="observacao"
                  type="text"
                  placeholder="Observação"
                  value={form.observation}
                  label="Observação"
                  onChange={({ target }) => form.setObservation(target.value)}
                />
              </div>
            </div>
            {form.error && <Error error={form.error} />}
            <Button
              className="bg-mint-500 hover:bg-mint-700 cursor-pointer w-full px-3 py-3 mt-4"
              onClick={form.submit}
              disabled={form.loading}
            >
              {form.loading
                ? "Carregando..."
                : isEditing
                  ? "Salvar alterações"
                  : "Cadastrar Transação"}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalTransaction
