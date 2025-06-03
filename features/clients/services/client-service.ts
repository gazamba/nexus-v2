import { createClient } from "@/utils/supabase/server";
import { Client } from "@/features/clients/types/client-types";

export async function getClientIdByUserId(userId: string) {
  const supabase = await createClient();

  console.log("userId", userId);

  const { data, error } = await supabase
    .from("client_user_assignment")
    .select("client_id")
    .eq("client_user_id", userId);

  if (error) {
    console.error("Error fetching client id:", error);
    return null;
  }

  console.log(`error: ${error}`);

  return data[0].client_id;
}

export async function getClientName(clientId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("client")
    .select("name")
    .eq("id", clientId)
    .single();

  if (error) {
    console.error("Error fetching client name:", error);
    return null;
  }

  return data.name;
}

export async function getClientsBySolutionsEngineerId(
  solutionsEngineerId: string
): Promise<Client[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("solutions_engineer_assignment")
    .select("client_id")
    .eq("se_user_id", solutionsEngineerId);

  const clientIds = data?.map((assignment) => assignment.client_id) || [];

  const { data: clients } = await supabase
    .from("client")
    .select("*")
    .in("id", clientIds);

  if (error) {
    throw new Error(
      `Error fetching assigned clients for user ${solutionsEngineerId}`
    );
  }

  return clients || [];
}
