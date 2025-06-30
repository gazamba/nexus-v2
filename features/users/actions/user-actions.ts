"use server";

import { revalidatePath } from "next/cache";
import {
  UserFormData,
  UserUpdateData,
  userSchema,
  userUpdateSchema,
} from "@/features/users/schemas/user-schema";
import { ActionResultType } from "@/types/types";
import {
  createCompleteUser,
  updateUser,
} from "@/features/users/services/user-service";

export async function createUserAction(
  userData: UserFormData
): Promise<ActionResultType> {
  try {
    const validation = userSchema.safeParse(userData);

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
  userId: string,
  userData: UserUpdateData
): Promise<ActionResultType> {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    const validation = userUpdateSchema.safeParse(userData);

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

export async function deleteUserAction(
  userId: string
): Promise<ActionResultType> {
  try {
    // await deleteUser(userId);
    revalidatePath("/users");

    return {
      success: true,
      message: "User deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting user:", error);

    return {
      success: false,
      message: "Failed to delete user",
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
