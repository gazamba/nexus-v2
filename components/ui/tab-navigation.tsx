"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface Tab {
  id: string;
  label: string;
  isActive?: boolean;
  href: string;
}

export function TabNavigation({ tabs }: { tabs: Tab[] }) {
  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
            tab.isActive
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          )}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}
