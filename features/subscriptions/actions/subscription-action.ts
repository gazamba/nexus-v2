"use server";

import { ActionResultType } from "@/types/types";
import { SubscriptionFormData } from "@/features/subscriptions/types/subscription-types";
import { subscriptionSchema } from "../schemas/subscription-schema";
import {
  createSubscriptionRecord,
  updateSubscriptionRecord,
  deleteSubscriptionRecord,
} from "../services/subscription-service";

export async function createSubscriptionAction(
  subscriptionFormData: SubscriptionFormData
): Promise<ActionResultType> {
  try {
    const validation = subscriptionSchema.safeParse(subscriptionFormData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form and try again.",
      };
    }

    await createSubscriptionRecord(validation.data);

    return {
      success: true,
      message: "Subscription created successfully!",
    };
  } catch (error) {
    console.error("Error creating subscription:", error);

    return {
      success: false,
      message: "Failed to create subscription!",
    };
  }
}

export async function updateSubscriptionAction(
  subscriptionId: string,
  subscriptionFormData: SubscriptionFormData
): Promise<ActionResultType> {
  try {
    const validation = subscriptionSchema.safeParse(subscriptionFormData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form and try again.",
      };
    }

    await updateSubscriptionRecord(subscriptionId, validation.data);

    return {
      success: true,
      message: "Subscription updated successfully!",
    };
  } catch (error) {
    console.error("Error updating subscription:", error);

    return {
      success: false,
      message: "Failed to update subscription!",
    };
  }
}

export async function deleteSubscriptionAction(
  subscriptionId: string
): Promise<ActionResultType> {
  try {
    await deleteSubscriptionRecord(subscriptionId);

    return {
      success: true,
      message: "Subscription deleted successfully!",
    };
  } catch (error) {
    console.error("Error deleting subscription:", error);

    return {
      success: false,
      message: "Failed to delete subscription!",
    };
  }
}
