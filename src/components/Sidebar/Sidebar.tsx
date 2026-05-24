"use client";

import Image from "next/image";
import Link from "next/link";

import { useSidebarSelection } from "../../hooks/useSidebarSelection";
import type { SidebarNavItem, SidebarProps } from "../../types/layout";

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

  return (
    <Link href={item.href} className={className}>
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
