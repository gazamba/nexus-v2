"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";

export default function ClientsPage() {
  const handleConfirmation = (confirm: boolean) => {
    console.log(confirm);
  };

  return (
    <div>
      <Modal
        title="Confirm Delete"
        trigger={<Button>Delete Client</Button>}
        buttonTextAction="Delete"
        onSubmit={() => handleConfirmation(true)}
      >
        <p>Are you sure you want to delete this client?</p>
      </Modal>
    </div>
  );
}
