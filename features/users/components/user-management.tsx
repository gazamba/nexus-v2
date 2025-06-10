import { Card, CardHeader } from "@/components/ui/card";
import { TabNavigation } from "@/components/ui/tab-navigation";
import { TitleContent } from "@/components/ui/title-content";
import { UsersTable } from "./users-table";

import type {
  User,
  UserSEWithAssignedClients,
} from "@/features/users/types/user-types";
import AddNewUser from "./add-new-user";

interface UserManagementProps {
  initialUsers: User[];
  initialSeUsers: UserSEWithAssignedClients[];
  activeTab: "admin" | "se";
}

export default function UserManagement({
  initialUsers,
  initialSeUsers,
  activeTab,
}: UserManagementProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <TitleContent title="Manage Users" />
        <AddNewUser />
      </div>
      <Card>
        <CardHeader>
          <TabNavigation
            tabs={[
              {
                id: "admin",
                label: "Admin Users",
                isActive: activeTab === "admin",
                href: "/users?tab=admin",
              },
              {
                id: "se",
                label: "SE Users",
                isActive: activeTab === "se",
                href: "/users?tab=se",
              },
            ]}
          />
          <UsersTable
            users={activeTab === "admin" ? initialUsers : initialSeUsers}
            activeTab={activeTab}
          />
        </CardHeader>
      </Card>
    </div>
  );
}
