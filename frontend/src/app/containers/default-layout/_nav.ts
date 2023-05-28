import { INavData } from "@coreui/angular";

export const navItems: INavData[] = [
  {
    name: "Dashboard",
    url: "/dashboard",
    iconComponent: { name: "cil-applications" },
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    name: "AI",
    url: "/ai",
    iconComponent: { name: "cib-react" },
    children: [
      {
        name: "Create Script",
        iconComponent: { name: "cil-code" },
        badge: {
          color: "danger-gradient",
          text: "NEW",
        },
        url: "/ai/create-script",
      },
      {
        name: "Troubleshoot",
        iconComponent: { name: "cil-magnifying-glass" },
        badge: {
          color: "danger-gradient",
          text: "NEW",
        },
        url: "/ai/troubleshoot",
      },
    ],
  },
  {
    name: "Inventory",
    url: "/inventory",
    iconComponent: { name: "cil-lan" },
    children: [
      {
        name: "Firewalls",
        url: "/inventory/firewall",
      },
      {
        name: "Panorama",
        url: "/inventory/panorama",
      },
      {
        name: "Prisma",
        url: "/inventory/prisma",
      },
    ],
  },
  {
    name: "Jobs",
    url: "/jobs",
    iconComponent: { name: "cil-list" },
  },
];
