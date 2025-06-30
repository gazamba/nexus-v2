import { z } from "zod";

export const userSchema = z.object({
  full_name: z.string({ required_error: "Full name is required." }).min(5),
  password: z.string().min(8, "Password must be at least 8 characters."),
  email: z
    .string({ required_error: "Email is required." })
    .email("Invalid email address."),
  phone: z.string(),
  role: z.string().min(1, "Role is required."),
  admin: z.boolean(),
  billing: z.boolean(),
  bill_rate: z.coerce
    .number({ invalid_type_error: "Bill rate must be a number." })
    .positive("Bill rate must be a positive number if provided.")
    .nullable(),
  cost_rate: z.coerce
    .number({ invalid_type_error: "Cost rate must be a number." })
    .positive("Cost rate must be a positive number if provided.")
    .nullable(),
  avatar_initial: z
    .string()
    .max(2, "Avatar initial can be at most 2 characters."),
  notes: z.string(),
});

export const userUpdateSchema = userSchema.partial(); // Make ALL fields optional for updates

export type UserFormData = z.infer<typeof userSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
