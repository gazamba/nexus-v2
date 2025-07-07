"use server";

import { ActionResultType } from "@/types/types";
import { ClientFormData } from "@/features/clients/types/client-types";
import { clientSchema } from "../schemas/client-schema";
import {
  createClientRecord,
  updateClientRecord,
} from "../services/client-service";

export async function createClientAction(
  clientFormData: ClientFormData
): Promise<ActionResultType> {
  try {
    const validation = clientSchema.safeParse(clientFormData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form and try again.",
      };
    }

    console.log(`clientData: ${JSON.stringify(clientFormData)}`);
    console.log(`validationData: ${JSON.stringify(validation.data)}`);
    await createClientRecord(validation.data);

    return {
      success: true,
      message: "Client created successfully!",
    };
  } catch (error) {
    console.error("Error creating client:", error);

    return {
      success: false,
      message: "Failed to create client!",
    };
  }
}

export async function updateClientAction(
  clientId: string,
  clientFormData: ClientFormData
): Promise<ActionResultType> {
  try {
    const validation = clientSchema.safeParse(clientFormData);

    if (!validation.success) {
      return {
        success: false,
        message: "Validation failed. Please check the form and try again.",
      };
    }

    console.log(`clientId: ${clientId}`);
    console.log(`clientData: ${JSON.stringify(clientFormData)}`);

    const result = await updateClientRecord(clientId, validation.data);

    return {
      success: true,
      message: "Client updated successfully!",
      data: result,
    };
  } catch (error) {
    console.error("Error updating client:", error);

    return {
      success: false,
      message: "Failed to update client!",
    };
  }
}
