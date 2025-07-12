"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import ClientForm from "@/features/clients/components/client-form";
import { useState } from "react";
import { ClientFormData } from "@/features/clients/types/client-types";
import { useToast } from "@/hooks/use-toast";

export default function DashboardAdminTableActions() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddClient = (data: ClientFormData) => {
    // TODO: Implement actual client add logic here
    setLoading(true);

    setTimeout(() => {
      console.log(data);
      setLoading(false);
    }, 1000);
    setOpen(false);
  };

  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
  }

  return (
    <>
      <Modal
        title="Add New Client"
        trigger={<Button>Add New Client</Button>}
        open={open}
        setOpen={setOpen}
      >
        <ClientForm
          onSubmit={handleAddClient}
          loading={loading}
          onCancel={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
