import { createClient } from "@/utils/supabase/server";
import { ClientType } from "@/features/clients/types/client-types";
import { ClientFormData } from "@/features/clients/types/client-types";

export async function getClients(): Promise<ClientType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("client").select("*");

  if (error) {
    console.error("Error fetching clients:", error);
    throw new Error("Error fetching clients");
  }

  return data;
}

export async function getClientByClientId(
  clientId: string
): Promise<ClientType> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("client")
    .select("*")
    .eq("id", clientId)
    .single();

  if (error) {
    console.error("Error fetching client:", error);
    throw new Error("Error fetching client");
  }

  return data;
}

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
): Promise<ClientType[]> {
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

export async function createClientRecord(clientFormData: ClientFormData) {
  const supabase = await createClient();

  const { data: clientData, error } = await supabase
    .from("client")
    .insert({
      name: clientFormData.name,
      departments: clientFormData.departments,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating client with error: ${error}`);
  }

  console.log(`clienData db: ${clientData}`);

  return clientData;
}

export async function updateClientRecord(
  clientId: string,
  clientFormData: ClientFormData
): Promise<ClientType> {
  const supabase = await createClient();

  if (!clientId) {
    throw new Error("ClientId is required to update an existent client!");
  }

  console.log(`clientId: ${clientId}`);
  console.log(`clientData: ${JSON.stringify(clientFormData)}`);

  const { data, error: errorFetchClient } = await supabase
    .from("client")
    .select("*")
    .eq("id", clientId)
    .single();

  if (errorFetchClient) {
    console.error("Error fetching client:", errorFetchClient);
    throw new Error("Error fetching client");
  }

  const { data: clientData, error } = await supabase
    .from("client")
    .update({
      name: clientFormData.name,
      departments: clientFormData.departments,
      active: clientFormData.active,
      url: clientFormData.url,
    })
    .eq("id", data.id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error updating client with error: ${error}`);
  }

  return clientData;
}
