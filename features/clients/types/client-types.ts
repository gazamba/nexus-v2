import { Database } from "@/utils/supabase/database.types";
import { z } from "zod";
import { clientSchema, clientUpdateSchema } from "../schemas/client-schema";

export type ClientType = Database["public"]["Tables"]["client"]["Row"];

export type ClientUpdatableType =
  Database["public"]["Tables"]["client"]["Update"];

export type ClientFormData = z.infer<typeof clientSchema>;
export type ClientUpdateData = z.infer<typeof clientUpdateSchema>;
