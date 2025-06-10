import { Suspense } from "react";
// import DashboardOverview from "@/features/dashboard-admin/components/dashboard-overview";
// import { getDashboardData } from "@/features/dashboard-admin/services/dashboard-service";
// import type { TimePeriod } from "@/features/dashboard-admin/types/dashboard-types";

interface HomeProps {
  period?: string;
}

export default async function Home({ period }: HomeProps) {
  const timePeriod = period || "itd";
  // const dashboardData = await getDashboardData(timePeriod);

  return (
    <>
      {/* <Suspense fallback={<div>Loading dashboard...</div>}> */}
      {/* <DashboardOverview data={dashboardData} activeTimePeriod={timePeriod} /> */}
      {/* </Suspense> */}
    </>
  );
}
