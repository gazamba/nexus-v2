"use client";

import React, { useState } from "react";
import { SubscriptionsTable } from "./subscription-table";
import {
  SubscriptionFormData,
  SubscriptionType,
} from "../types/subscription-types";
import Modal from "@/components/ui/modal";
import SubscriptionForm from "./subscription-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  createSubscriptionAction,
  deleteSubscriptionAction,
  updateSubscriptionAction,
} from "../actions/subscription-action";
import { useRouter } from "next/navigation";
import { TitleContent } from "@/components/ui/title-content";

export default function SubscriptionsManagement({
  subscriptions,
}: {
  subscriptions: SubscriptionType[];
}) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editingSubscriptionId, setEditingSubscriptionId] = useState<
    string | null
  >(null);
  const [editLoading, setEditLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleAddSubscription = async (
    subscriptionData: SubscriptionFormData
  ) => {
    setAddLoading(true);
    const { success, message } = await createSubscriptionAction(
      subscriptionData
    );
    if (!success) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setAddLoading(false);
      return;
    }

    console.log("Adding subscription:", subscriptionData);
    toast({
      title: "Success",
      description: message,
    });
    setAddModalOpen(false);
    setAddLoading(false);
    router.refresh();
  };

  const handleEditSubscription = async (
    subscriptionId: string,
    subscriptionData: SubscriptionFormData
  ) => {
    setEditLoading(true);

    const { success, message } = await updateSubscriptionAction(
      subscriptionId,
      subscriptionData
    );

    if (!success) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      setEditLoading(false);
      return;
    }

    console.log("Editing subscription:", subscriptionData);
    setEditLoading(false);
    setEditingSubscriptionId(null);
    toast({
      title: "Success",
      description: "Subscription updated successfully!",
    });
    router.refresh();
  };

  const handleDeleteSubscription = async (subscriptionId: string) => {
    const { success, message } = await deleteSubscriptionAction(subscriptionId);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Subscription deleted successfully!",
    });
    setDeleteModalOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="space-y-4 mb-4">
        <div className="flex justify-end items-center">
          <Modal
            title="Add New Subscription"
            trigger={<Button>Add New Subscription</Button>}
            open={addModalOpen}
            setOpen={setAddModalOpen}
          >
            <SubscriptionForm
              onCreate={handleAddSubscription}
              loading={addLoading}
              onCancel={() => setAddModalOpen(false)}
            />
          </Modal>
        </div>
      </div>

      <SubscriptionsTable
        subscriptions={subscriptions}
        editingSubscriptionId={editingSubscriptionId}
        setEditingSubscriptionId={setEditingSubscriptionId}
        loading={editLoading}
        onEdit={handleEditSubscription}
        onCancel={() => setEditingSubscriptionId(null)}
        onDelete={handleDeleteSubscription}
        deleteModalOpen={deleteModalOpen}
        setDeleteModalOpen={setDeleteModalOpen}
      />
    </>
  );
}
