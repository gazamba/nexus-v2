import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserTableRow } from "./user-table-row";
import type {
  User,
  UserSEWithAssignedClients,
} from "@/features/users/types/user-types";

interface UsersTableProps {
  users: User[] | UserSEWithAssignedClients[];
  activeTab: "admin" | "se";
}

const tableHeaders = [
  {
    label: "Name",
    key: "name",
    visible: ["admin", "se"],
  },
  {
    label: "Email",
    key: "email",
    visible: ["admin", "se"],
  },
  {
    label: "Phone",
    key: "phone",
    visible: ["admin", "se"],
  },
  {
    label: "Cost Rate",
    key: "cost_rate",
    visible: ["se"],
  },
  {
    label: "Bill Rate",
    key: "bill_rate",
    visible: ["se"],
  },
  {
    label: "Assigned Clients",
    key: "assigned_clients",
    visible: ["se"],
  },
  {
    label: "Actions",
    key: "actions",
    visible: ["admin", "se"],
  },
];

export function UsersTable({ users, activeTab }: UsersTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table className="w-full">
        <TableHeader className="bg-gray-50">
          <TableRow>
            {tableHeaders
              .filter((header) => header.visible.includes(activeTab))
              .map((header) => (
                <TableHead key={header.key}>{header.label}</TableHead>
              ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {users.map(
            (user: User | UserSEWithAssignedClients, index: number) => (
              <UserTableRow key={index} user={user} />
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
