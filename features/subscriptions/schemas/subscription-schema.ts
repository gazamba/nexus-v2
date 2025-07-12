import { z } from "zod";

export const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  pricing_model: z
    .string()
    .min(1, "Pricing model is required")
    .refine((val) => ["fixed", "tiered", "usage"].includes(val), {
      message: "Pricing model must be one of: fixed, tiered, usage",
    }),
  credit_per_period: z.number().optional(),
  price_per_credit: z.number().optional(),
  product_usage_api: z
    .string()
    .min(1, "Product usage API is required")
    .refine((val) => ["air-direct", "credit-card"].includes(val), {
      message: "Product usage API must be one of: air-direct, credit-card",
    }),
  contract_length: z
    .string()
    .min(1, "Contract length is required")
    .refine((val) => ["month", "quarter", "year"].includes(val), {
      message: "Contract length must be one of: month, quarter, year",
    }),
  payment_cadence: z
    .string()
    .min(1, "Payment cadence is required")
    .refine((val) => ["monthly", "quarterly", "yearly"].includes(val), {
      message: "Payment cadence must be one of: monthly, quarterly, yearly",
    }),
  setup_fee: z.number().min(0, "Setup fee must be non-negative"),
  prepayment_percentage: z.number().optional(),
  cap_amount: z.number().optional(),
  average_cost: z.number().optional(),
});
