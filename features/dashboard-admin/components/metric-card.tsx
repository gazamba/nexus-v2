import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { MetricCardType } from "../types/dashboard-admin-types";

export function MetricCard({
  title,
  value,
  change,
  className,
}: MetricCardType) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-600">{title}</h3>
          {change && (
            <div
              className={cn(
                "flex items-center text-sm font-medium",
                change.trend === "up" ? "text-green-600" : "text-red-600"
              )}
            >
              {change.trend === "up" ? (
                <ArrowUpIcon className="mr-1 h-4 w-4" />
              ) : (
                <ArrowDownIcon className="mr-1 h-4 w-4" />
              )}
              {change.value}%
            </div>
          )}
        </div>
        <div className="mt-2 text-4xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
