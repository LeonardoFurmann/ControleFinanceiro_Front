import type { TransactionResponse } from "@/types/MouthData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TableTransactionsProps = {
  transactions: TransactionResponse[];
};

function getTransactionTypeLabel(type: number): string {
  if (type === 1) return "Entrada";
  if (type === 2) return "Saida";
  return `Tipo ${type}`;
}

function formatAmount(amount: string): string {
  const normalized = amount.replace(",", ".");
  const value = Number(normalized);

  if (Number.isNaN(value)) {
    return amount;
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}


function formatDate(date: string): string {
    let dateD = new Date(date);

    let day = dateD.getDate();
    let dayFormat = day < 10 ? "0" + day : day;
    
    let month = dateD.getMonth() + 1;
    let monthFormat = month < 10 ? "0" + month : month;

    let year = dateD.getFullYear();

    return dayFormat + "/" + monthFormat + "/" + year;


}

const TableTransactions = ({ transactions }: TableTransactionsProps) => {
  return (
    <div className="bg-card w-full mt-4 rounded-md shadow-sm px-2 py-3">
      <Table>
        <TableCaption>Lista de transacoes do periodo selecionado.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">ID</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Dia</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Pagamento</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                Nenhuma transacao encontrada para este periodo.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell>{transaction.day}</TableCell>
                <TableCell>{getTransactionTypeLabel(transaction.transactionType)}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell className="text-right">
                  {formatAmount(transaction.amount)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTransactions;
