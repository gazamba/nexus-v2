import { ActionResultType } from "@/types/types";
import { ClientFormData } from "@/features/clients/types/client-types";
import { clientSchema } from "../schemas/client-schema";
import {
  createClientRecord,
  updateClientRecord,
} from "../services/client-service";

export async function createClientAction(
  clientData: ClientFormData
): Promise<ActionResultType> {
  try {
    const validation = clientSchema.safeParse(clientData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form and try again.",
        errors: validation.error.flatten().fieldErrors,
      };
    }
    const result = await createClientRecord(validation.data);

    return {
      success: true,
      message: "Client created successfully!",
      data: result,
    };
  } catch (error) {
    console.error("Error creating client:", error);

    return {
      success: false,
      message: "Failed to create client",
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function updateClientAction(
  clientId: string,
  clientData: ClientFormData
): Promise<ActionResultType> {
  try {
    const validation = clientSchema.safeParse(clientData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form and try again.",
        errors: validation.error.flatten().fieldErrors,
      };
    }
    const result = await updateClientRecord(clientId, validation.data);

    return {
      success: true,
      message: "Client created successfully!",
      data: result,
    };
  } catch (error) {
    console.error("Error creating client:", error);

    return {
      success: false,
      message: "Failed to create client",
      errors: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
