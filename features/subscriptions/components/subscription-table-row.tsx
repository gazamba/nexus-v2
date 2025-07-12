import { TableCell, TableRow } from "@/components/ui/table";
import {
  SubscriptionFormData,
  SubscriptionType,
} from "@/features/subscriptions/types/subscription-types";
import Modal from "@/components/ui/modal";
import SubscriptionForm from "./subscription-form";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ModalConfirmation from "@/components/ui/modal-confirmation";

interface SubscriptionTableRowProps {
  subscription: SubscriptionType;
  open: boolean;
  setOpen: (open: boolean) => void;
  loading?: boolean;
  onEdit: (subscriptionId: string, data: SubscriptionFormData) => void;
  onDelete: (subscriptionId: string) => void;
  onCancel?: () => void;
  deleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
}

export function SubscriptionTableRow({
  subscription,
  open,
  setOpen,
  onEdit,
  onDelete,
  onCancel,
  loading,
  deleteModalOpen,
  setDeleteModalOpen,
}: SubscriptionTableRowProps) {
  return (
    <TableRow>
      <TableCell className="text-gray-600">
        <Modal
          title="Edit Subscription"
          open={open}
          setOpen={setOpen}
          trigger={
            <Button
              variant="ghost"
              className="p-0 h-auto font-normal text-blue-500 hover:text-blue-700 hover:underline"
            >
              {subscription.name}
            </Button>
          }
        >
          <SubscriptionForm
            onEdit={onEdit}
            onCancel={onCancel}
            loading={loading}
            subscription={subscription}
          />
        </Modal>
      </TableCell>
      <TableCell className="text-gray-600">
        {subscription.pricing_model}
      </TableCell>
      <TableCell className="text-gray-600">
        {subscription.credit_per_period}
      </TableCell>
      <TableCell className="text-gray-600">
        {subscription.price_per_credit}
      </TableCell>
      <TableCell className="text-gray-600">
        {subscription.product_usage_api}
      </TableCell>
      <TableCell className="text-gray-600">
        {subscription.contract_length}
      </TableCell>
      <TableCell className="text-gray-600">
        {subscription.payment_cadence}
      </TableCell>
      <TableCell className="text-gray-600">{subscription.setup_fee}</TableCell>
      <TableCell className="text-gray-600">
        {subscription.prepayment_percentage}
      </TableCell>
      <TableCell className="text-gray-600">{subscription.cap_amount}</TableCell>
      <TableCell className="text-gray-600">
        {subscription.average_cost}
      </TableCell>
      <TableCell className="text-gray-600">
        <ModalConfirmation
          title="Confirm Delete"
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          }
          open={deleteModalOpen}
          setOpen={setDeleteModalOpen}
          onAction={() => onDelete(subscription.id!)}
        >
          <p>Are you sure you want to delete this subscription?</p>
        </ModalConfirmation>
      </TableCell>
    </TableRow>
  );
}
