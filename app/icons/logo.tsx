import { Label } from "@/components/ui/label";
import { Bot } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Bot className="w-5 h-5" />
      <Label className="text-xl font-semibold text-gray-900">Nexus</Label>
    </div>
  );
}
