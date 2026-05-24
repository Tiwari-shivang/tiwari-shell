"use client";

import Image from "next/image";
import Link from "next/link";

import { useSidebarSelection } from "../../hooks/useSidebarSelection.js";
import type { SidebarNavItem, SidebarProps } from "../../types/layout.js";

const PROTOCOL_REGEX = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

function resolveHref(href: string): { href: string; isExternal: boolean } {
  if (href.startsWith("//")) {
    return { href, isExternal: true };
  }

  if (PROTOCOL_REGEX.test(href)) {
    if (
      (href.startsWith("http://") || href.startsWith("https://")) &&
      typeof window !== "undefined"
    ) {
      try {
        const url = new URL(href, window.location.origin);

        if (url.origin === window.location.origin) {
          return {
            href: `${url.pathname}${url.search}${url.hash}`,
            isExternal: false,
          };
        }
      } catch {
        return { href, isExternal: true };
      }
    }

    return { href, isExternal: true };
  }

  if (href.startsWith("/") || href.startsWith("#") || href.startsWith("?")) {
    return { href, isExternal: false };
  }

  return { href: `/${href}`, isExternal: false };
}

function SidebarItem({
  item,
  isSelected,
}: {
  item: SidebarNavItem;
  isSelected: boolean;
}) {
  const className = [
    "zs-sidebar-item",
    isSelected ? "zs-sidebar-item-selected" : "zs-sidebar-item-default",
    item.disabled ? "zs-sidebar-item-disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const iconSrc = isSelected && item.activeIcon ? item.activeIcon : item.icon;
  const textClassName = isSelected
    ? "zs-sidebar-item-label-active"
    : "zs-sidebar-item-label";

  if (!item.href || item.disabled) {
    return (
      <div aria-disabled="true" className={className}>
        <Image src={iconSrc} alt={item.label} width={20} height={20} />
        <span className={textClassName}>{item.label}</span>
      </div>
    );
  }

  const resolved = resolveHref(item.href);

  if (resolved.isExternal) {
    return (
      <a href={resolved.href} className={className}>
        <Image src={iconSrc} alt={item.label} width={20} height={20} />
        <span className={textClassName}>{item.label}</span>
      </a>
    );
  }

  return (
    <Link href={resolved.href} className={className}>
      <Image src={iconSrc} alt={item.label} width={20} height={20} />
      <span className={textClassName}>{item.label}</span>
    </Link>
  );
}

export default function Sidebar({
  logoSrc,
  logoAlt = "Company icon",
  navItems,
}: SidebarProps) {
  const isSelected = useSidebarSelection();

  return (
    <aside className="zs-sidebar">
      <div className="zs-sidebar-logo-wrap">
        <div className="zs-sidebar-logo-pill">
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={26}
            height={26}
            className="zs-sidebar-logo-image"
          />
        </div>
      </div>
      <div className="zs-sidebar-body">
        <nav className="zs-sidebar-nav">
          {navItems.map((item) => (
            <SidebarItem
              key={`${item.label}-${item.href ?? "disabled"}`}
              item={item}
              isSelected={isSelected(item)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
