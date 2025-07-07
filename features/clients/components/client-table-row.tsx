import { TableCell, TableRow } from "@/components/ui/table";
import { ClientFormData, ClientType } from "../types/client-types";
import Link from "next/link";
import Modal from "@/components/ui/modal";
import ClientForm from "./client-form";
import { Button } from "@/components/ui/button";

interface ClientTableRowProps {
  client: ClientType;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading?: boolean;
  onEdit: (clientId: string, data: ClientFormData) => void;
  onCancel?: () => void;
}

export function ClientTableRow({
  client,
  open,
  setOpen,
  onEdit,
  onCancel,
  loading,
}: ClientTableRowProps) {
  return (
    <TableRow>
      <TableCell className="text-gray-600">
        <Modal
          title="Edit Client"
          open={open}
          setOpen={setOpen}
          trigger={
            <Button
              variant="ghost"
              className="p-0 h-auto font-normal text-blue-500 hover:text-blue-700 hover:underline"
            >
              {client.name}
            </Button>
          }
        >
          <ClientForm
            onEdit={onEdit}
            onCancel={onCancel}
            loading={loading}
            client={client}
          />
        </Modal>
      </TableCell>
      <TableCell className="text-gray-600">{client.created_at}</TableCell>
      <TableCell className="text-gray-600">
        {client.departments?.join(", ")}
      </TableCell>
      <TableCell className="text-gray-600">
        <Link
          className="hover:underline hover:text-blue-500 flex items-center text-blue-500"
          href={`#`}
        >
          {client.url}
        </Link>
      </TableCell>
      <TableCell className="text-gray-600">
        {client.active ? "Active" : "Inactive"}
      </TableCell>
    </TableRow>
  );
}
