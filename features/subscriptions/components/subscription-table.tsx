import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubscriptionTableRow } from "./subscription-table-row";
import {
  SubscriptionFormData,
  SubscriptionType,
} from "@/features/subscriptions/types/subscription-types";

interface DashboardAdminTableProps {
  subscriptions: SubscriptionType[];
  loading?: boolean;
  onEdit: (subscriptionId: string, data: SubscriptionFormData) => void;
  onCancel?: () => void;
  editingSubscriptionId: string | null;
  setEditingSubscriptionId: (subscriptionId: string | null) => void;
  onDelete: (subscriptionId: string) => void;
  deleteModalOpen: boolean;
  setDeleteModalOpen: (open: boolean) => void;
}

const tableHeaders = [
  {
    label: "Name",
    key: "name",
  },
  {
    label: "Pricing Model",
    key: "pricing_model",
  },
  {
    label: "Credit per Period",
    key: "credit_per_period",
  },
  {
    label: "Price per Credit",
    key: "price_per_credit",
  },
  {
    label: "Product Usage API",
    key: "product_usage_api",
  },
  {
    label: "Contract Length",
    key: "contract_length",
  },
  {
    label: "Payment Cadence",
    key: "payment_cadence",
  },
  {
    label: "Setup Fee",
    key: "setup_fee",
  },
  {
    label: "Prepayment Percentage",
    key: "prepayment_percentage",
  },
  {
    label: "Cap Amount",
    key: "cap_amount",
  },
  {
    label: "Average Cost",
    key: "average_cost",
  },
  {
    label: "Actions",
    key: "actions",
  },
];

export function SubscriptionsTable({
  subscriptions,
  editingSubscriptionId,
  setEditingSubscriptionId,
  onEdit,
  onCancel,
  onDelete,
  deleteModalOpen,
  setDeleteModalOpen,
}: DashboardAdminTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table className="w-full items-center">
        <TableHeader className="bg-gray-50">
          <TableRow>
            {tableHeaders.map((header) => (
              <TableHead key={header.key}>{header.label}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="bg-white divide-y divide-gray-200">
          {subscriptions.map(
            (subscription: SubscriptionType, index: number) => (
              <SubscriptionTableRow
                key={index}
                subscription={subscription}
                open={editingSubscriptionId === subscription.id}
                setOpen={(open) =>
                  setEditingSubscriptionId(open ? subscription.id : null)
                }
                onEdit={onEdit}
                onCancel={onCancel}
                onDelete={onDelete}
                deleteModalOpen={deleteModalOpen}
                setDeleteModalOpen={setDeleteModalOpen}
              />
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
