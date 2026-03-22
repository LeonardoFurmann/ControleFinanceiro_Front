import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { TransactionResponse } from "@/types/MouthData"

function getTransactionTypeLabel(type: number): string {
  if (type === 1) return "Entrada"
  if (type === 2) return "Saida"
  return `Tipo ${type}`
}

function parseAmount(amount: string): number {
  const value = Number(amount)
  return Number.isNaN(value) ? 0 : value
}

function formatAmount(amount: string): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(parseAmount(amount))
}

function formatDate(date: string): string {
  const parsedDate = new Date(date)

  const day = String(parsedDate.getDate()).padStart(2, "0")
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0")
  const year = parsedDate.getFullYear()

  return `${day}/${month}/${year}`
}

export const columns: ColumnDef<TransactionResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="font-medium">{row.original.id}</span>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="-ml-3 cursor-pointer select-none"
      >
        Data
        <ArrowUpDown className="size-4" />
      </Button>
    ),
    sortingFn: (rowA, rowB) =>
      new Date(rowA.original.date).getTime() - new Date(rowB.original.date).getTime(),
    cell: ({ row }) => formatDate(row.original.date),
  },
  {
    accessorKey: "transactionType",
    header: "Tipo",
    cell: ({ row }) => getTransactionTypeLabel(row.original.transactionType),
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "paymentMethod",
    header: "Pagamento",
  },
  {
    accessorKey: "observation",
    header: "Observacao",
    cell: ({ row }) => row.original.observation || "-",
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="cursor-pointer select-none"
        >
          Valor
          <ArrowUpDown className="size-4" />
        </Button>
      </div>
    ),
    sortingFn: (rowA, rowB) =>
      parseAmount(rowA.original.amount) - parseAmount(rowB.original.amount),
    cell: ({ row }) => (
      <div className="text-right">{formatAmount(row.original.amount)}</div>
    ),
  },
]
