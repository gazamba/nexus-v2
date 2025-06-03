import Image from "next/image";
import { Label } from "../ui/label";

export default function BraintrustLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/braintrust-logo.png"
        alt="Braintrust Logo"
        width={20}
        height={20}
      />
      <Label className="text-xl font-semibold text-gray-900">Braintrust</Label>
    </div>
  );
}
