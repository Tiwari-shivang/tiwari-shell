"use client";

import { usePathname } from "next/navigation";

import type { SidebarNavItem } from "../types/layout";

export function useSidebarSelection(): (item: SidebarNavItem) => boolean {
  const pathname = usePathname();

  return (item: SidebarNavItem) => {
    if (item.href && pathname === item.href) {
      return true;
    }

    if (!item.startsWith || item.startsWith.length === 0) {
      return false;
    }

    return item.startsWith.some((prefix) => pathname.startsWith(prefix));
  };
}
