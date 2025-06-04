import { Client } from "@/features/clients/types/client-types";
import { Database } from "@/utils/supabase/database.types";

export type User = Database["public"]["Tables"]["user"]["Row"];

export type UserInsert = Database["public"]["Tables"]["user"]["Insert"];

export type UserUpdate = Database["public"]["Tables"]["user"]["Update"];

export type UserWithPassword = UserUpdate & {
  password?: string;
};

export type UserSEWithAssignedClients = User & {
  assigned_clients?: Client[] | null;
};

export type UserWithAssignments = Omit<User, "assigned_clients"> & {
  solutions_engineer_assignment?: { client: Client }[];
};
