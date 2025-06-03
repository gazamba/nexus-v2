import UserManagement from "@/features/users/components/user-management";
import {
  getUsersByRole,
  getUsersSEWithAssignedClients,
} from "@/features/users/services/user-service";

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const activeTab = tab === "se" ? "se" : "admin";
  const seUsers = await getUsersSEWithAssignedClients();
  const adminUsers = await getUsersByRole("admin");

  return (
    <div>
      <UserManagement
        initialUsers={adminUsers}
        initialSeUsers={seUsers}
        activeTab={activeTab}
      />
    </div>
  );
}
