import SubscriptionsManagement from "@/features/subscriptions/components/subscriptions-management";
import { getSubscriptions } from "@/features/subscriptions/services/subscription-service";

export default async function SubscriptionsPage() {
  const subscriptions = await getSubscriptions();
  return <SubscriptionsManagement subscriptions={subscriptions} />;
}
