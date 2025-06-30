"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type TimePeriod = "7d" | "30d" | "mtd" | "qtd" | "ytd" | "itd";

interface TimePeriodFilterProps {
  defaultValue?: TimePeriod;
  onChange?: (value: TimePeriod) => void;
}

export function TimePeriodFilter({
  defaultValue = "itd",
  onChange,
}: TimePeriodFilterProps) {
  const [selected, setSelected] = useState<TimePeriod>(defaultValue);

  const handleSelect = (value: TimePeriod) => {
    setSelected(value);
    onChange?.(value);
  };

  const periods = [
    { value: "7d" as TimePeriod, label: "Last 7 days" },
    { value: "30d" as TimePeriod, label: "Last 30 days" },
    { value: "mtd" as TimePeriod, label: "MTD" },
    { value: "qtd" as TimePeriod, label: "QTD" },
    { value: "ytd" as TimePeriod, label: "YTD" },
    { value: "itd" as TimePeriod, label: "ITD" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {periods.map((period) => (
        <button
          key={period.value}
          onClick={() => handleSelect(period.value)}
          className={cn(
            "px-4 py-2 rounded-md text-base font-medium transition-colors",
            selected === period.value
              ? "bg-black text-white"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
          )}
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}
