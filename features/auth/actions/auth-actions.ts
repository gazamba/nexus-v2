"use server";

import { userSchema } from "@/features/users/schemas/user-schema";
import { createUser } from "@/features/users/services/user-service";
import { createClient } from "@/utils/supabase/server";

export async function loginAction(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return error;
}

export async function signUpAction(formData: FormData) {
  const supabase = await createClient();

  const rawFormData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    fullName: formData.get("fullName") as string,
    role: formData.get("role") as string,
    phone: formData.get("phone") as string,
    isBilling: formData.get("isBilling") === "true",
    isAdmin: formData.get("isAdmin") === "true",
    avatarInitial: formData.get("avatarInitial") as string,
    notes: formData.get("notes") as string,
    billRate: formData.get("billRate") as string,
    costRate: formData.get("costRate") as string,
  };

  const validation = userSchema.safeParse(rawFormData);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: rawFormData.email,
    password: rawFormData.password,
  });

  if (signUpError) {
    return {
      success: false,
      message: "Sign up failed.",
      errors: signUpError.message,
    };
  } else {
    const userInsert = {
      id: signUpData.user?.id as string,
      email: rawFormData.email,
      full_name: rawFormData.fullName,
      avatar_initial: rawFormData.avatarInitial,
      role: rawFormData.role,
      phone: rawFormData.phone,
      billing: rawFormData.isBilling,
      admin: rawFormData.isAdmin,
      bill_rate: Number(rawFormData.billRate),
      cost_rate: Number(rawFormData.costRate),
      notes: rawFormData.notes,
    };
    const user = await createUser(userInsert);
    return {
      success: true,
      message: "Sign up successful.",
      user,
    };
  }
}

export async function signOutAction() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  return error;
}
