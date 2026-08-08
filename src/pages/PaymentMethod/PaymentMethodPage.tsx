import { useCallback, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header/Header";
import Error from "@/components/Helper/Error";
import Input from "@/components/Input/Input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApiRequest } from "@/hooks/useApiResquest";
import { paymenteMethodAPI } from "@/services/api";
import type { PaymentMethod } from "@/types/PaymentMethod";

type FormMode = "create" | "edit" | null;

const PaymentMethodPage = () => {
    const { execute } = useApiRequest();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const loadPaymentMethods = useCallback(async () => {
    setLoading(true);
    setPageError("");
    const result = await execute<PaymentMethod[]>(() => paymenteMethodAPI.getAll());

    if (result.success) {
      setPaymentMethods(result.data ?? []);
      setPage(0);
    } else {
      setPageError(result.message);
    }
    setLoading(false);
  }, [execute]);

  useEffect(() => {
    void loadPaymentMethods();
  }, [loadPaymentMethods]);

  const openCreateModal = () => {
    setSelectedPaymentMethod(null);
    setDescription("");
    setFormError("");
    setFormMode("create");
  };

  const openEditModal = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setDescription(paymentMethod.description);
    setFormError("");
    setFormMode("edit");
  };

  const closeFormModal = () => {
    if (!submitting) setFormMode(null);
  };

  const submitPaymentMethod = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      setFormError("Informe o nome do método de pagamento.");
      return;
    }

    setSubmitting(true);
    setFormError("");
    const result = formMode === "edit" && selectedPaymentMethod
      ? await execute<PaymentMethod>(() => paymenteMethodAPI.update(selectedPaymentMethod.id, trimmedDescription))
      : await execute<PaymentMethod>(() => paymenteMethodAPI.create(trimmedDescription));

    setSubmitting(false);
    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setFormMode(null);
    await loadPaymentMethods();
  };

  const openDeleteModal = (paymentMethod: PaymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setFormError("");
    setDeleteOpen(true);
  };

  const deletePaymentMethod = async () => {
    if (!selectedPaymentMethod) return;

    setSubmitting(true);
    setFormError("");
    const result = await execute<void>(() => paymenteMethodAPI.remove(selectedPaymentMethod.id));
    setSubmitting(false);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setDeleteOpen(false);
    setSelectedPaymentMethod(null);
    await loadPaymentMethods();
  };

  const pageCount = Math.max(Math.ceil(paymentMethods.length / pageSize), 1);
  const paginatedPaymentMethods = paymentMethods.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <section className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[1800px] px-4 flex flex-col items-center sm:px-8">
        <Header />

        <main className="w-full max-w-5xl py-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Métodos de Pagamento</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Organize os métodos de pagamento usadas nas suas transações.
              </p>
            </div>
            <Button
              className="cursor-pointer bg-mint-700 hover:bg-mint-900"
              onClick={openCreateModal}
            >
              <Plus /> Novo Método de Pagamento
            </Button>
          </div>

          {pageError && <div className="mb-4"><Error error={pageError} /></div>}

          <div className="overflow-hidden rounded-md border border-border bg-card p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-24">ID</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="w-28 text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={3} className="h-24 text-center">Carregando métodos de pagamento...</TableCell></TableRow>
                ) : paymentMethods.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="h-24 text-center">Nenhum métodos de pagamento cadastrado.</TableCell></TableRow>
                ) : (
                  paginatedPaymentMethods.map((paymentMethod) => (
                    <TableRow key={paymentMethod.id}>
                      <TableCell className="font-medium">{paymentMethod.id}</TableCell>
                      <TableCell>{paymentMethod.description}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <Button variant="ghost" size="icon-sm" className="cursor-pointer" onClick={() => openEditModal(paymentMethod)} aria-label={`Editar método de pagamento ${paymentMethod.description}`}>
                            <Pencil />
                          </Button>
                          <Button variant="ghost" size="icon-sm" className="cursor-pointer text-destructive hover:text-destructive" onClick={() => openDeleteModal(paymentMethod)} aria-label={`Excluir método de pagamento ${paymentMethod.description}`}>
                            <Trash2 />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {!loading && paymentMethods.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 py-4">
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">Linhas por página</p>
                <Select
                  value={String(pageSize)}
                  onValueChange={(value) => {
                    setPageSize(Number(value));
                    setPage(0);
                  }}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">Página {page + 1} de {pageCount}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setPage((currentPage) => currentPage - 1)} disabled={page === 0}>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="cursor-pointer" onClick={() => setPage((currentPage) => currentPage + 1)} disabled={page >= pageCount - 1}>
                  Próxima
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      <Dialog open={formMode !== null} onOpenChange={(open) => !open && closeFormModal()}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>{formMode === "edit" ? "Editar Método de Pagamento" : "Novo método de Pagamento"}</DialogTitle>
            <DialogDescription>
              {formMode === "edit" ? "Altere o nome do método de Pagamento selecionada." : "Informe o nome do novo método de Pagamento."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitPaymentMethod} className="space-y-4">
            <Input
              label="Nome do método de pagamento"
              name="category-description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Ex.: Banco"
              required
              max={100}
            />
            {formError && <Error error={formError} />}
            <DialogFooter>
              <Button type="button" variant="outline" className="cursor-pointer" onClick={closeFormModal} disabled={submitting}>Cancelar</Button>
              <Button type="submit" className="cursor-pointer bg-mint-700 hover:bg-mint-900" disabled={submitting}>
                {submitting ? "Salvando..." : formMode === "edit" ? "Salvar alterações" : "Cadastrar método de pagamento"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={(open) => !submitting && setDeleteOpen(open)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Excluir método de pagamento</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o método de pagamento“{selectedPaymentMethod?.description}”? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          {formError && <Error error={formError} />}
          <DialogFooter>
            <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setDeleteOpen(false)} disabled={submitting}>Cancelar</Button>
            <Button type="button" variant="destructive" className="cursor-pointer" onClick={deletePaymentMethod} disabled={submitting}>
              {submitting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PaymentMethodPage;