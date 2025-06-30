import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardAdminTableRow } from "./dashboard-admin-table-row";
import { ClientWithMetricsType } from "../types/dashboard-admin-types";

interface DashboardAdminTableProps {
  clients: ClientWithMetricsType[];
}

const tableHeaders = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Contract Start",
    key: "contractStart",
  },
  {
    label: "Workflows",
    key: "workflows",
  },
  {
    label: "Nodes",
    key: "nodes",
  },
  {
    label: "Executions",
    key: "executions",
  },
  {
    label: "Exceptions",
    key: "exceptions",
  },
  {
    label: "Revenue",
    key: "revenue",
  },
  {
    label: "Time Saved",
    key: "timeSaved",
  },
  {
    label: "Money Saved",
    key: "moneySaved",
  },
];

export function DashboardAdminTable({ clients }: DashboardAdminTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table className="w-full items-center">
        <TableHeader className="bg-gray-50">
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header.key}>{header.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {clients.map((client: ClientWithMetricsType, index: number) => (
            <DashboardAdminTableRow key={index} client={client} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
