"use client";

import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import type { MetricsGridType } from "../types/dashboard-admin-types";
import type { ClientWithMetricsType } from "../types/dashboard-admin-types";
import { DashboardAdminTable } from "./dashboard-admin-table";
import { MetricsGrid } from "./metrics-grid";
import { TimePeriodFilter } from "./time-period-filter";
import DashboardAdminTableActions from "./dashboard-admin-table-actions";

export default function DashboardAdminManagement({
  sampleMetrics,
  clientsWithMetrics,
}: {
  sampleMetrics: MetricsGridType;
  clientsWithMetrics: ClientWithMetricsType[];
}) {
  const [metrics, setMetrics] = useState<MetricsGridType>(sampleMetrics);
  const [clients, setClients] =
    useState<ClientWithMetricsType[]>(clientsWithMetrics);

  const handleFilterChange = (timePeriod: string) => {
    //call to server action to get metrics
    setMetrics({
      totalWorkflows: { value: 0, change: 0 },
      totalExceptions: { value: 0, change: 0 },
      timeSaved: { value: "0", change: 0 },
      revenue: { value: "0", change: 0 },
      activeClients: { value: 0, change: 0 },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <TimePeriodFilter onChange={handleFilterChange} />
      <MetricsGrid metrics={metrics} />
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center">
          <Label className="text-lg font-semibold">All Clients</Label>
          <DashboardAdminTableActions />
        </div>
        <DashboardAdminTable clients={clients} />
      </div>
    </div>
  );
}
