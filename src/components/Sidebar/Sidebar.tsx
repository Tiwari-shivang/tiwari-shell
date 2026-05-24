"use client";

import type { MouseEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { layoutStyles } from "../../styles/layoutStyles.js";
import { useSidebarSelection } from "../../hooks/useSidebarSelection.js";
import type { SidebarNavItem, SidebarProps } from "../../types/layout.js";
import Link from "next/link.js";

const PROTOCOL_REGEX = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

type ResolvedHref = {
  href: string;
  isExternal: boolean;
  pushHref?: string;
};

function resolveHref(href: string): ResolvedHref {
  if (href.startsWith("//")) {
    return { href, isExternal: true };
  }

  if (PROTOCOL_REGEX.test(href)) {
    if ((href.startsWith("http://") || href.startsWith("https://")) && typeof window !== "undefined") {
      try {
        const url = new URL(href, window.location.origin);

        if (url.origin === window.location.origin) {
          return {
            href,
            pushHref: `${url.pathname}${url.search}${url.hash}`,
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
    return { href, isExternal: false, pushHref: href };
  }

  return { href: `/${href}`, isExternal: false, pushHref: `/${href}` };
}

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

function handleInternalNavigation(
  event: MouseEvent<HTMLAnchorElement>,
  resolved: ResolvedHref,
  navigate: (href: string) => void
) {
  if (event.defaultPrevented || event.button !== 0 || isModifiedClick(event)) {
    return;
  }

  event.preventDefault();
  navigate(resolved.pushHref ?? resolved.href);
}

function SidebarItem({
  item,
  isSelected,
  navigate,
}: {
  item: SidebarNavItem;
  isSelected: boolean;
  navigate: (href: string) => void;
}) {
  const baseItemStyle = isSelected
    ? layoutStyles.sidebarItemSelected
    : layoutStyles.sidebarItemDefault;
  const itemStyle = item.disabled
    ? { ...baseItemStyle, ...layoutStyles.sidebarItemDisabled }
    : baseItemStyle;

  const iconSrc = isSelected && item.activeIcon ? item.activeIcon : item.icon;
  const textStyle = isSelected
    ? layoutStyles.sidebarItemLabelActive
    : layoutStyles.sidebarItemLabel;

  if (!item.href || item.disabled) {
    return (
      <div aria-disabled="true" style={itemStyle}>
        <Image src={iconSrc} alt={item.label} width={20} height={20} />
        <span style={textStyle}>{item.label}</span>
      </div>
    );
  }

  const resolved = resolveHref(item.href);
  return (
    <Link
      href={item.href}
      style={itemStyle}
    >
      <Image src={iconSrc} alt={item.label} width={20} height={20} />
      <span style={textStyle}>{item.label}</span>
    </Link>
  );
}

export default function Sidebar({
  logoSrc,
  logoAlt = "Company icon",
  navItems,
}: SidebarProps) {
  const isSelected = useSidebarSelection();
  const router = useRouter();
  const navigate = (href: string) => {
    router.push(href);
  };

  return (
    <aside style={layoutStyles.sidebar}>
      <div style={layoutStyles.sidebarLogoWrap}>
        <div style={layoutStyles.sidebarLogoPill}>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={26}
            height={26}
          />
        </div>
      </div>
      <div style={layoutStyles.sidebarBody}>
        <nav style={layoutStyles.sidebarNav}>
          {navItems.map((item) => (
            <SidebarItem
              key={`${item.label}-${item.href ?? "disabled"}`}
              item={item}
              isSelected={isSelected(item)}
              navigate={navigate}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
