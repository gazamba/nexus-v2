import { z } from "zod";

export const userSchema = z.object({
  full_name: z
    .string({ required_error: "Full name is required." })
    .min(3, "Full name must be at least 3 characters."),
  password: z.string({ required_error: "Password is required." }),
  email: z
    .string({ required_error: "Email is required." })
    .email("Invalid email address."),
  phone: z.string().nullable().optional(),
  role: z.enum(["admin", "se"], {
    required_error: "Role is required.",
    message: "Role must be either Admin or SE.",
  }),
  admin: z.boolean().default(false),
  billing: z.boolean().default(false),
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

export const userUpdateSchema = userSchema.partial({
  full_name: true,
  password: true,
  email: true,
  phone: true,
  role: true,
  admin: true,
  billing: true,
  bill_rate: true,
  cost_rate: true,
  avatar_initial: true,
  notes: true,
});

export type UserFormData = z.infer<typeof userSchema>;
export type UserUpdateData = z.infer<typeof userUpdateSchema>;
