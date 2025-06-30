import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ItemBadge } from "@/components/ui/item-badge";
import {
  UserType,
  UserSEWithAssignedClientsType,
} from "@/features/users/types/user-types";
import { TableRow, TableCell } from "@/components/ui/table";
import UserTableActions from "@/features/users/components/user-table-actions";

interface UserTableRowProps {
  user: UserType | UserSEWithAssignedClientsType;
}

export function UserTableRow({ user }: UserTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 flex items-center justify-center">
            <AvatarFallback>{user.avatar_initial}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-900">{user.full_name}</span>
        </div>
      </TableCell>
      <TableCell className="text-gray-600">{user.email}</TableCell>
      <TableCell className="text-gray-600">{user.phone}</TableCell>
      {user.role === "se" && (
        <>
          <TableCell className="text-gray-600">{user.cost_rate}</TableCell>
          <TableCell className="text-gray-600">{user.bill_rate}</TableCell>
          <TableCell>
            <div className="flex gap-1 flex-wrap">
              {"assigned_clients" in user &&
                user.assigned_clients?.map((client, index) => (
                  <ItemBadge key={index} name={client.name} />
                ))}
            </div>
          </TableCell>
        </>
      )}
      <TableCell>
        <div className="flex items-center gap-2">
          <UserTableActions user={user} />
        </div>
      </TableCell>
    </TableRow>
  );
}
