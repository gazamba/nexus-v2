import { Card, CardContent } from "@/components/ui/card";

export default function StatsCard({
  title,
  value,
  change,
  isNegative = false,
}: {
  title: string;
  value: string | number;
  change: number;
  isNegative?: boolean;
}) {
  const isPositive = change > 0;
  const changeIcon = isPositive ? "↑" : "↓";
  const changeColor = isNegative
    ? isPositive
      ? "text-red-500"
      : "text-green-500"
    : isPositive
    ? "text-green-500"
    : "text-red-500";

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <span
              className={`text-sm font-medium ${changeColor} flex items-center gap-1`}
            >
              {changeIcon} {Math.abs(change)}%
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
