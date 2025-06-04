"use server";

import { revalidatePath } from "next/cache";
import {
  userSchema,
  userUpdateSchema,
} from "@/features/users/schemas/user-schema";
import { ActionResult } from "@/types/types";
import {
  createCompleteUser,
  updateUser,
} from "@/features/users/services/user-service";

export async function createUserAction(
  formData: FormData
): Promise<ActionResult> {
  try {
    const rawFormData = {
      full_name: formData.get("full_name"),
      email: formData.get("email"),
      password: formData.get("password"),
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
        message: "Validation failed. Please check the form and try again.",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const result = await createCompleteUser(validation.data);
    revalidatePath("/users");

    return {
      success: true,
      message: "User created successfully!",
      data: result.userData,
    };
  } catch (error) {
    console.error("Error creating user:", error);

    return {
      success: false,
      message: "Failed to create user",
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateUserAction(
  formData: FormData
): Promise<ActionResult> {
  try {
    const rawFormData = {
      full_name: formData.get("full_name") || null,
      email: formData.get("email") || null,
      password: formData.get("password") as string,
      phone: formData.get("phone") || null,
      role: formData.get("role") || null,
      admin: formData.get("admin") === "on" || false,
      billing: formData.get("billing") === "on" || false,
      bill_rate: formData.get("bill_rate")
        ? Number(formData.get("bill_rate"))
        : null,
      cost_rate: formData.get("cost_rate")
        ? Number(formData.get("cost_rate"))
        : null,
      avatar_initial: formData.get("avatar_initial") || null,
      notes: formData.get("notes") || null,
    };

    const userId = formData.get("id") as string;

    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const validation = userUpdateSchema.safeParse(rawFormData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form and try again.",
        errors: validation.error.flatten().fieldErrors,
      };
    }

    const result = await updateUser(userId, validation.data);

    revalidatePath("/users");

    return {
      success: true,
      message: "User updated successfully!",
      data: result,
    };
  } catch (error) {
    console.error("Error updating user:", error);

    return {
      success: false,
      message: "Failed to update user",
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
