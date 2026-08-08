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
import { categoryAPI } from "@/services/api";
import type { Category } from "@/types/Category";

type FormMode = "create" | "edit" | null;

const CategoryPage = () => {
  const { execute } = useApiRequest();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [description, setDescription] = useState("");
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setPageError("");
    const result = await execute<Category[]>(() => categoryAPI.getAll());

    if (result.success) {
      setCategories(result.data ?? []);
      setPage(0);
    } else {
      setPageError(result.message);
    }
    setLoading(false);
  }, [execute]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  const openCreateModal = () => {
    setSelectedCategory(null);
    setDescription("");
    setFormError("");
    setFormMode("create");
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setDescription(category.description);
    setFormError("");
    setFormMode("edit");
  };

  const closeFormModal = () => {
    if (!submitting) setFormMode(null);
  };

  const submitCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedDescription = description.trim();

    if (!trimmedDescription) {
      setFormError("Informe o nome da categoria.");
      return;
    }

    setSubmitting(true);
    setFormError("");
    const result = formMode === "edit" && selectedCategory
      ? await execute<Category>(() => categoryAPI.update(selectedCategory.id, trimmedDescription))
      : await execute<Category>(() => categoryAPI.create(trimmedDescription));

    setSubmitting(false);
    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setFormMode(null);
    await loadCategories();
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setFormError("");
    setDeleteOpen(true);
  };

  const deleteCategory = async () => {
    if (!selectedCategory) return;

    setSubmitting(true);
    setFormError("");
    const result = await execute<void>(() => categoryAPI.remove(selectedCategory.id));
    setSubmitting(false);

    if (!result.success) {
      setFormError(result.message);
      return;
    }

    setDeleteOpen(false);
    setSelectedCategory(null);
    await loadCategories();
  };

  const pageCount = Math.max(Math.ceil(categories.length / pageSize), 1);
  const paginatedCategories = categories.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <section className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-[1800px] px-4 flex flex-col items-center sm:px-8">
        <Header />

        <main className="w-full max-w-5xl py-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Categorias</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Organize as categorias usadas nas suas transações.
              </p>
            </div>
            <Button
              className="cursor-pointer bg-mint-700 hover:bg-mint-900"
              onClick={openCreateModal}
            >
              <Plus /> Nova categoria
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
                  <TableRow><TableCell colSpan={3} className="h-24 text-center">Carregando categorias...</TableCell></TableRow>
                ) : categories.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="h-24 text-center">Nenhuma categoria cadastrada.</TableCell></TableRow>
                ) : (
                  paginatedCategories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell className="font-medium">{category.id}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell>
                        <div className="flex justify-center gap-1">
                          <Button variant="ghost" size="icon-sm" className="cursor-pointer" onClick={() => openEditModal(category)} aria-label={`Editar categoria ${category.description}`}>
                            <Pencil />
                          </Button>
                          <Button variant="ghost" size="icon-sm" className="cursor-pointer text-destructive hover:text-destructive" onClick={() => openDeleteModal(category)} aria-label={`Excluir categoria ${category.description}`}>
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
          {!loading && categories.length > 0 && (
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
            <DialogTitle>{formMode === "edit" ? "Editar categoria" : "Nova categoria"}</DialogTitle>
            <DialogDescription>
              {formMode === "edit" ? "Altere o nome da categoria selecionada." : "Informe o nome da nova categoria."}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitCategory} className="space-y-4">
            <Input
              label="Nome da categoria"
              name="category-description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Ex.: Alimentação"
              required
              max={100}
            />
            {formError && <Error error={formError} />}
            <DialogFooter>
              <Button type="button" variant="outline" className="cursor-pointer" onClick={closeFormModal} disabled={submitting}>Cancelar</Button>
              <Button type="submit" className="cursor-pointer bg-mint-700 hover:bg-mint-900" disabled={submitting}>
                {submitting ? "Salvando..." : formMode === "edit" ? "Salvar alterações" : "Cadastrar categoria"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={(open) => !submitting && setDeleteOpen(open)}>
        <DialogContent className="bg-card">
          <DialogHeader>
            <DialogTitle>Excluir categoria</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a categoria “{selectedCategory?.description}”? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          {formError && <Error error={formError} />}
          <DialogFooter>
            <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setDeleteOpen(false)} disabled={submitting}>Cancelar</Button>
            <Button type="button" variant="destructive" className="cursor-pointer" onClick={deleteCategory} disabled={submitting}>
              {submitting ? "Excluindo..." : "Excluir"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CategoryPage;
