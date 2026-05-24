import type { ReactNode } from "react";
import type { StaticImageData } from "next/image";

export type ImageSource = string | StaticImageData;

export interface HeaderProps {
  userName?: string;
  userImageSrc: ImageSource;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export interface SidebarNavItem {
  label: string;
  href?: string;
  icon: ImageSource;
  activeIcon?: ImageSource;
  startsWith?: string[];
  disabled?: boolean;
}

export interface SidebarProps {
  logoSrc: ImageSource;
  logoAlt?: string;
  navItems: SidebarNavItem[];
}

export interface AppLayoutProps {
  children: ReactNode;
  header: HeaderProps;
  sidebar: SidebarProps;
}
