import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClientTableRow } from "./client-table-row";
import { ClientType } from "../types/client-types";
import { ClientFormData } from "../types/client-types";

interface DashboardAdminTableProps {
  clients: ClientType[];
  loading?: boolean;
  onEdit: (clientId: string, data: ClientFormData) => void;
  onCancel?: () => void;
  editingClientId: string | null;
  setEditingClientId: (clientId: string | null) => void;
}

const tableHeaders = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Created At",
    key: "created_at",
  },
  {
    label: "Departments",
    key: "departments",
  },
  {
    label: "URL",
    key: "url",
  },
  {
    label: "Active",
    key: "active",
  },
];

export function ClientsTable({
  clients,
  editingClientId,
  setEditingClientId,
  onEdit,
  onCancel,
}: DashboardAdminTableProps) {
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
          {clients.map((client: ClientType, index: number) => (
            <ClientTableRow
              key={index}
              client={client}
              open={editingClientId === client.id}
              setOpen={(open) => setEditingClientId(open ? client.id : null)}
              onEdit={onEdit}
              onCancel={onCancel}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
