import { Database } from "@/utils/supabase/database.types";
import { z } from "zod";
import { subscriptionSchema } from "../schemas/subscription-schema";

export type SubscriptionType =
  Database["public"]["Tables"]["subscription"]["Row"];

export type SubscriptionFormData = z.infer<typeof subscriptionSchema>;
