import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  active: z.boolean().default(true),
  departments: z.array(z.string()).optional().nullable(),
  status: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  plan_id: z.string().optional().nullable(),
});

export const clientUpdateSchema = clientSchema.partial();
