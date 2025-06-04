"use server";

import { createClient } from "@/utils/supabase/server";
import {
  User,
  UserSEWithAssignedClients,
  UserWithPassword,
  UserWithAssignments,
} from "@/features/users/types/user-types";

export async function createCompleteUser(params: UserWithPassword) {
  const supabase = await createClient();

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email: params.email!,
    password: params.password!,
    options: {
      data: {
        full_name: params.full_name,
      },
    },
  });

  if (signUpError) {
    throw new Error(`Auth signup failed: ${signUpError.message}`);
  }

  try {
    const { data: userData, error: userError } = await supabase
      .from("user")
      .insert({
        id: authData.user?.id,
        email: params.email,
        full_name: params.full_name,
        avatar_initial: params.full_name![0],
        role: params.role,
        phone: params.phone,
        billing: params.billing || false,
        admin: params.admin || false,
        notes: params.notes,
        bill_rate: params.bill_rate,
        cost_rate: params.cost_rate,
      })
      .select()
      .single();

    if (userError) {
      await supabase.auth.admin.deleteUser(authData.user!.id);
      throw new Error(`Failed to create user: ${userError.message}`);
    }

    return {
      authUser: authData.user,
      userData: userData,
    };
  } catch (error) {
    if (authData.user?.id) {
      await supabase.auth.admin.deleteUser(authData.user.id);
    }
    throw error;
  }
}

export async function updateUser(userId: string, params: UserWithPassword) {
  const supabase = await createClient();

  if (!userId) {
    throw new Error("User ID is required");
  }

  const { data: userData, error: userError } = await supabase
    .from("user")
    .select("*")
    .eq("id", userId)
    .single();

  if (userError) {
    throw new Error(`Error fetching user: ${userError.message}`);
  }

  const { error: authError } = await supabase.auth.updateUser({
    email: params.email || undefined,
    password: params.password || undefined,
    data: {
      full_name: params.full_name || undefined,
    },
  });

  if (authError) {
    throw new Error(`Error updating auth user: ${authError.message}`);
  }

  const { data: updatedUserData, error: userUpdatedError } = await supabase
    .from("user")
    .update({
      email: params.email || undefined,
      full_name: params.full_name || undefined,
      role: params.role || undefined,
      phone: params.phone || undefined,
      billing: params.billing || undefined,
      admin: params.admin || undefined,
      notes: params.notes || undefined,
      bill_rate: params.bill_rate || undefined,
      cost_rate: params.cost_rate || undefined,
      avatar_initial: params.full_name || undefined,
    })
    .eq("id", userId)
    .select()
    .single();

  if (userUpdatedError) {
    throw new Error(`Error updating user: ${userUpdatedError.message}`);
  }

  return updatedUserData;
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
