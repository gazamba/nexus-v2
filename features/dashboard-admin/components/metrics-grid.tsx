import type { MetricsGridType } from "../types/dashboard-admin-types";
import { MetricCard } from "./metric-card";

export function MetricsGrid({ metrics }: { metrics: MetricsGridType }) {
  const { totalWorkflows, totalExceptions, timeSaved, revenue, activeClients } =
    metrics;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <MetricCard
        title="Total Workflows"
        value={totalWorkflows.value.toLocaleString()}
        change={{
          value: totalWorkflows.change,
          trend: totalWorkflows.change >= 0 ? "up" : "down",
        }}
      />
      <MetricCard
        title="Total Exceptions"
        value={totalExceptions.value.toLocaleString()}
        change={{
          value: Math.abs(totalExceptions.change),
          trend: totalExceptions.change >= 0 ? "up" : "down",
        }}
      />
      <MetricCard
        title="Time Saved"
        value={timeSaved.value}
        change={{
          value: timeSaved.change,
          trend: timeSaved.change >= 0 ? "up" : "down",
        }}
      />
      <MetricCard
        title="Revenue"
        value={revenue.value}
        change={{
          value: revenue.change,
          trend: revenue.change >= 0 ? "up" : "down",
        }}
      />
      <MetricCard
        title="Active Clients"
        value={activeClients.value.toLocaleString()}
        change={{
          value: activeClients.change,
          trend: activeClients.change >= 0 ? "up" : "down",
        }}
      />
    </div>
  );
}
