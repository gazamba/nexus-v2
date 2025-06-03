"use server";

import { revalidatePath } from "next/cache";
import { userSchema } from "@/features/users/schemas/user-schema";

export async function createUserAction(formData: FormData) {
  const rawFormData = {
    full_name: formData.get("full_name"),
    email: formData.get("email"),
    phone: formData.get("phone") || null,
    role: formData.get("role"),
    admin: formData.get("admin") === "on",
    billing: formData.get("billing") === "on",
    bill_rate: formData.get("bill_rate")
      ? Number(formData.get("bill_rate"))
      : null,
    cost_rate: formData.get("cost_rate")
      ? Number(formData.get("cost_rate"))
      : null,
    avatar_initial: formData.get("avatar_initial") || null,
    notes: formData.get("notes") || null,
  };

  const validation = userSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // Simulate database operation
  console.log("Creating user:", validation.data);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate network delay

  // Example: Simulate a potential error
  // if (Math.random() > 0.5) {
  //   return {
  //     success: false,
  //     message: "Failed to create user due to a server error.",
  //   };
  // }

  revalidatePath("/users"); // Revalidate the users page to show the new user

  return {
    success: true,
    message: "User created successfully!",
    user: { ...validation.data, id: Date.now().toString() }, // Return a mock user
  };
}
