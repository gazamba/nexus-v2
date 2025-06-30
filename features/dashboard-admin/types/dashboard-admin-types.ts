export type MetricCardType = {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  className?: string;
};

export type MetricsGridType = {
  totalWorkflows: { value: number; change: number };
  totalExceptions: { value: number; change: number };
  timeSaved: { value: string; change: number };
  revenue: { value: string; change: number };
  activeClients: { value: number; change: number };
};

export type ClientWithMetricsType = {
  id: string;
  name: string;
  contractId: string;
  contractStart: string;
  workflows: number;
  nodes: number;
  executions: number;
  exceptions: number;
  revenue: string;
  timeSaved: string;
  moneySaved: string;
};
