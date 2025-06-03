"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import BraintrustLogo from "./braintrust-logo";
import { TitleHeader } from "./title-header";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/auth-provider";
import { labelItems } from "./contants";

export function TopHeader() {
  const { clientName } = useAuth();
  const pathname = usePathname();
  const title = clientName
    ? clientName
    : labelItems.find((item) => item.href === pathname)?.label || "Admin";

  return (
    <header className="flex items-center justify-between bg-white border-b border-gray-200">
      <div className="flex items-center justify-center h-16 w-60 border-r border-gray-200">
        <BraintrustLogo />
      </div>
      <div className="px-6 h-16 mr-auto flex justify-end items-center">
        <TitleHeader title={title} />
      </div>
      <div className="flex items-center gap-3 px-4">
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <Avatar className="w-8 h-8">
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
