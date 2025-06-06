import { z } from "zod";

export const userSchema = z.object({
  full_name: z
    .string({ required_error: "Full name is required." })
    .min(3, "Full name must be at least 3 characters.")
    .nullable(),
  password: z.string({ required_error: "Password is required." }),
  email: z
    .string({ required_error: "Email is required." })
    .email("Invalid email address.")
    .nullable(),
  phone: z.string().nullable().optional(),
  role: z.string().nullable(),
  admin: z.boolean().nullable().default(false),
  billing: z.boolean().nullable().default(false),
  bill_rate: z.coerce
    .number({ invalid_type_error: "Bill rate must be a number." })
    .positive("Bill rate must be a positive number if provided.")
    .nullable()
    .optional(),
  cost_rate: z.coerce
    .number({ invalid_type_error: "Cost rate must be a number." })
    .positive("Cost rate must be a positive number if provided.")
    .nullable()
    .optional(),
  avatar_initial: z
    .string()
    .max(2, "Avatar initial can be at most 2 characters.")
    .nullable()
    .optional(),
  notes: z.string().nullable().optional(),
});

export const userUpdateSchema = userSchema.partial(); // Make ALL fields optional for updates

export type UserFormData = z.infer<typeof userSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
