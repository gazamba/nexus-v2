import DashboardAdminManagement from "@/features/dashboard/components/admin/dashboard-admin-management";

// Sample data
const sampleMetrics = {
  totalWorkflows: { value: 2847, change: 12 },
  totalExceptions: { value: 156, change: -8 },
  timeSaved: { value: "1,284h", change: 24 },
  revenue: { value: "$847K", change: 16 },
  activeClients: { value: 128, change: 5 },
};

const clientsWithMetrics = [
  {
    id: "1",
    name: "Acme Corp",
    contractId: "1234567890",
    contractStart: "Jan 15, 2025",
    workflows: 24,
    nodes: 156,
    executions: 1847,
    exceptions: 12,
    revenue: "$24,500",
    timeSaved: "284h",
    moneySaved: "$42,600",
  },
];

export default async function DashboardPage() {
  return (
    <>
      <DashboardAdminManagement
        sampleMetrics={sampleMetrics}
        clientsWithMetrics={clientsWithMetrics}
      />
    </>
  );
}
