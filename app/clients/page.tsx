import ClientsManagement from "@/features/clients/components/clients-management";
import { getClients } from "@/features/clients/services/client-service";

export default async function ClientsPage() {
  const clients = await getClients();
  return (
    <>
      <ClientsManagement clients={clients} />
    </>
  );
}
