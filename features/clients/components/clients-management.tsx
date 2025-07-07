"use client";

import React, { useState } from "react";
import { ClientsTable } from "./clients-table";
import { ClientFormData, ClientType } from "../types/client-types";
import Modal from "@/components/ui/modal";
import ClientForm from "./client-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  createClientAction,
  updateClientAction,
} from "../actions/client-actions";
import { useRouter } from "next/navigation";

export default function ClientsManagement({
  clients,
}: {
  clients: ClientType[];
}) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editingClientId, setEditingClientId] = useState<string | null>(null);
  const [editLoading, setEditLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddClient = async (clientData: ClientFormData) => {
    setAddLoading(true);
    const { success, message } = await createClientAction(clientData);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setAddLoading(false);
      return;
    }

    console.log("Adding client:", clientData);
    toast({
      title: "Success",
      description: message,
    });
    setAddModalOpen(false);
    setAddLoading(false);
    router.refresh();
  };

  const handleEditClient = async (
    clientId: string,
    clientData: ClientFormData
  ) => {
    setEditLoading(true);

    const { success, message } = await updateClientAction(clientId, clientData);

    if (!success) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setEditLoading(false);
      return;
    }

    console.log("Editing client:", clientData);
    setEditLoading(false);
    setEditingClientId(null);
    toast({
      title: "Success",
      description: "Client updated successfully!",
    });
    router.refresh();
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Modal
          title="Add New Client"
          trigger={<Button>Add New Client</Button>}
          open={addModalOpen}
          setOpen={setAddModalOpen}
        >
          <ClientForm
            onCreate={handleAddClient}
            loading={addLoading}
            onCancel={() => setAddModalOpen(false)}
          />
        </Modal>
      </div>

      <ClientsTable
        clients={clients}
        editingClientId={editingClientId}
        setEditingClientId={setEditingClientId}
        loading={editLoading}
        onEdit={handleEditClient}
        onCancel={() => setEditingClientId(null)}
      />
    </>
  );
}
