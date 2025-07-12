import { createClient } from "@/utils/supabase/server";
import {
  SubscriptionFormData,
  SubscriptionType,
} from "@/features/subscriptions/types/subscription-types";

export async function getSubscriptions(): Promise<SubscriptionType[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("subscription").select("*");

  if (error) {
    console.error("Error fetching subscriptions:", error);
    throw new Error("Error fetching subscriptions");
  }

  return data;
}

export async function createSubscriptionRecord(
  subscriptionFormData: SubscriptionFormData
) {
  const supabase = await createClient();
  console.log("Adding subscription:", JSON.stringify(subscriptionFormData));
  const { data, error } = await supabase
    .from("subscription")
    .insert(subscriptionFormData);
  if (error) {
    console.log("Error:", JSON.stringify(error));
    throw new Error(`Error creating subscription with error: ${error}`);
  }

  return data;
}

export async function updateSubscriptionRecord(
  subscriptionId: string,
  subscriptionFormData: SubscriptionFormData
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscription")
    .update(subscriptionFormData)
    .eq("id", subscriptionId);

  if (error) {
    throw new Error(`Error updating subscription with error: ${error}`);
  }

  return data;
}

export async function deleteSubscriptionRecord(subscriptionId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("subscription")
    .delete()
    .eq("id", subscriptionId);

  if (error) {
    throw new Error(`Error deleting subscription with error: ${error}`);
  }

  return data;
}
