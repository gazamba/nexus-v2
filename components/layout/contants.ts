import {
  Home,
  Users,
  Building2,
  CreditCard,
  RefreshCw,
  MessageSquare,
  BarChart3,
  AlertTriangle,
} from "lucide-react";
import { LabelItem } from "./types/layout-types";

export const labelItems: LabelItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    href: "/users",
  },
  {
    id: "clients",
    label: "Clients",
    icon: Building2,
    href: "/clients",
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
    href: "/billing",
  },
  {
    id: "subscriptions",
    label: "Subscriptions",
    icon: RefreshCw,
    href: "/subscriptions",
  },
  {
    id: "messaging",
    label: "Messaging",
    icon: MessageSquare,
    href: "/messaging",
  },
  {
    id: "reporting",
    label: "Reporting",
    icon: BarChart3,
    href: "/reporting",
  },
  {
    id: "exceptions",
    label: "Exceptions",
    icon: AlertTriangle,
    href: "/exceptions",
  },
];
