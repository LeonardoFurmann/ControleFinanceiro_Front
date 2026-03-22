import { columns } from "@/components/Table/transactions/columns";
import { DataTable } from "@/components/Table/transactions/data-table";
import type { TransactionResponse } from "@/types/MouthData";

type TableTransactionsProps = {
  transactions: TransactionResponse[];
};

const TableTransactions = ({ transactions }: TableTransactionsProps) => {
  return (
    <div className="bg-card w-full mt-4 rounded-md shadow-sm px-2 py-3">
      <DataTable
        columns={columns}
        data={transactions}
        emptyMessage="Nenhuma transacao encontrada para este periodo."
      />
    </div>
  );
};

export default TableTransactions;
