import { ClientType } from "@/features/clients/types/client-types";
import { Database } from "@/utils/supabase/database.types";

export type UserType = Database["public"]["Tables"]["user"]["Row"];

export type UserInsertType = Database["public"]["Tables"]["user"]["Insert"];

export type UserUpdateType = Database["public"]["Tables"]["user"]["Update"];

export type UserWithPasswordType = UserUpdateType & {
  password?: string;
};

export type UserSEWithAssignedClientsType = UserType & {
  assigned_clients?: ClientType[] | null;
};

export type UserWithAssignmentsType = Omit<UserType, "assigned_clients"> & {
  solutions_engineer_assignment?: { client: ClientType }[];
};
