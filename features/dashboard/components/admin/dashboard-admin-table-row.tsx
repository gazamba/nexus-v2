import { TableCell, TableRow } from "@/components/ui/table";
import { ClientWithMetricsType } from "../types/dashboard-admin-types";
import Link from "next/link";

export function DashboardAdminTableRow({
  client,
}: {
  client: ClientWithMetricsType;
}) {
  return (
    <TableRow>
      <TableCell className="text-gray-600">
        <Link
          className="hover:underline hover:text-blue-500 flex items-center text-blue-500"
          href={`/clients/${client.id}`}
        >
          {client.name}
        </Link>
      </TableCell>
      <TableCell className="text-gray-600">
        <Link
          className="hover:underline hover:text-blue-500 flex items-center text-blue-500"
          href={`#`}
        >
          {client.contractStart}
        </Link>
      </TableCell>
      <TableCell className="text-gray-600">
        <Link
          className="hover:underline hover:text-blue-500 flex items-center text-blue-500"
          href={`#`}
        >
          {client.workflows}
        </Link>
      </TableCell>
      <TableCell className="text-gray-600">
        <Link
          className="hover:underline hover:text-blue-500 flex items-center text-blue-500"
          href={`#`}
        >
          {client.nodes}
        </Link>
      </TableCell>
      <TableCell className="text-gray-600">
        <Link
          className="hover:underline hover:text-blue-500 flex items-center text-blue-500"
          href={`#`}
        >
          {client.executions}
        </Link>
      </TableCell>
      <TableCell className="text-gray-600">
        <Link
          className="hover:underline hover:text-blue-500 flex items-center text-blue-500"
          href={`#`}
        >
          {client.exceptions}
        </Link>
      </TableCell>
      <TableCell className="text-gray-600">{client.revenue}</TableCell>
      <TableCell className="text-gray-600">{client.timeSaved}</TableCell>
      <TableCell className="text-gray-600">{client.moneySaved}</TableCell>
    </TableRow>
  );
}
