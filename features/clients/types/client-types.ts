import { Database } from "@/utils/supabase/database.types";

export type Client = Database["public"]["Tables"]["client"]["Row"];
