"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { layoutStyles } from "../../styles/layoutStyles.js";
import { useSidebarSelection } from "../../hooks/useSidebarSelection.js";
import type { SidebarNavItem, SidebarProps } from "../../types/layout.js";
import Link from "next/link.js";

function SidebarItem({
  item,
  isSelected,
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
