import { createClient } from "@/utils/supabase/server";
import {
  User,
  UserInsert,
  UserSEWithAssignedClients,
  UserWithAssignments,
} from "@/features/users/types/user-types";

export async function createUser(user: UserInsert): Promise<User> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user")
    .insert(user)
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }

  return data;
}

export async function getUsersByRole(role: string): Promise<User[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("role", role);

  if (error) {
    throw new Error(`Error fetching users by role '${role}': ${error.message}`);
  }

  return data || [];
}

export async function getUserByUserID(userId: string): Promise<User> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(
      `Error fetching user by user id ${userId}: ${error.message}`
    );
  }

  return data;
}

export async function getUsersSEWithAssignedClients(): Promise<
  UserSEWithAssignedClients[]
> {
  const supabase = await createClient();

  const { data: seUsers, error } = await supabase
    .from("user")
    .select(
      `
    *,
    solutions_engineer_assignment (
      *,
      client (
        *
      )
    )
  `
    )
    .eq("role", "se");

  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Error fetching users:", error);
  }

  let usersWithClients = seUsers.map(
    (user: UserWithAssignments): UserSEWithAssignedClients => {
      const { solutions_engineer_assignment, ...rest } = user;
      return {
        ...rest,
        assigned_clients:
          solutions_engineer_assignment?.map(
            (assignment) => assignment.client
          ) || [],
      };
    }
  );

  return usersWithClients;
}
