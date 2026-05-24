"use client";

import { usePathname } from "next/navigation";

import type { SidebarNavItem } from "../types/layout.js";

const PROTOCOL_REGEX = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

function stripQueryAndHash(path: string) {
  const queryIndex = path.indexOf("?");
  const hashIndex = path.indexOf("#");
  const cutIndex =
    queryIndex === -1
      ? hashIndex
      : hashIndex === -1
        ? queryIndex
        : Math.min(queryIndex, hashIndex);

  return cutIndex === -1 ? path : path.slice(0, cutIndex);
}

function normalizeInternalPath(path: string): string | null {
  if (!path) {
    return null;
  }

  if (path.startsWith("//")) {
    return null;
  }

  if (PROTOCOL_REGEX.test(path)) {
    if (
      (path.startsWith("http://") || path.startsWith("https://")) &&
      typeof window !== "undefined"
    ) {
      try {
        const url = new URL(path, window.location.origin);

        if (url.origin === window.location.origin) {
          return stripQueryAndHash(url.pathname || "/");
        }
      } catch {
        return null;
      }
    }

    return null;
  }

  if (path.startsWith("#") || path.startsWith("?")) {
    return null;
  }

  if (path.startsWith("/")) {
    return stripQueryAndHash(path);
  }

  return stripQueryAndHash(`/${path}`);
}

export function useSidebarSelection(): (item: SidebarNavItem) => boolean {
  const pathname = usePathname();

  return (item: SidebarNavItem) => {
    const normalizedHref = item.href
      ? normalizeInternalPath(item.href)
      : null;

    if (normalizedHref && pathname === normalizedHref) {
      return true;
    }

    if (!item.startsWith || item.startsWith.length === 0) {
      return false;
    }

    return item.startsWith
      .map((prefix) => normalizeInternalPath(prefix))
      .filter((prefix): prefix is string => Boolean(prefix))
      .some((prefix) => pathname.startsWith(prefix));
  };
}
