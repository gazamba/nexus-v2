"use server";

import { userSchema } from "@/features/users/schemas/user-schema";
import { createCompleteUser } from "@/features/users/services/user-service";
import { createClient } from "@/utils/supabase/server";
import { ActionResultType } from "@/types/types";

export async function loginAction(
  formData: FormData
): Promise<ActionResultType> {
  try {
    const supabase = await createClient();

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return {
        success: false,
        message: "Login failed",
      };
    }

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}

export async function signUpAndCreateUserAction(
  formData: FormData
): Promise<ActionResultType> {
  try {
    const rawFormData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      full_name: formData.get("fullName") as string,
      role: formData.get("role") as string,
      phone: (formData.get("phone") as string) || null,
      billing: formData.get("isBilling") === "true",
      admin: formData.get("isAdmin") === "true",
      avatar_initial: (formData.get("avatarInitial") as string) || null,
      notes: (formData.get("notes") as string) || null,
      bill_rate: formData.get("billRate")
        ? Number(formData.get("billRate"))
        : null,
      cost_rate: formData.get("costRate")
        ? Number(formData.get("costRate"))
        : null,
    };

    const validation = userSchema.safeParse(rawFormData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed",
      };
    }

    const result = await createCompleteUser(validation.data);

    return {
      success: true,
      message: "Account created successfully",
      data: result.userData,
    };
  } catch (error) {
    console.error("Error in signup:", error);
    return {
      success: false,
      message: "Failed to create account",
    };
  }
}

export async function signOutAction(): Promise<ActionResultType> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return {
        success: false,
        message: "Failed to sign out",
      };
    }

    return {
      success: true,
      message: "Signed out successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
}
