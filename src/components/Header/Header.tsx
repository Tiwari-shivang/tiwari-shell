"use client";

import Image from "next/image";
import { Bell, ChevronDown, Search } from "lucide-react";

import { layoutStyles } from "../../styles/layoutStyles.js";
import type { HeaderProps } from "../../types/layout.js";

export default function Header({
  userName = "User",
  userImageSrc,
  searchPlaceholder = "Search",
  onSearchChange,
  onNotificationClick,
  onProfileClick,
}: HeaderProps) {
  return (
    <header style={layoutStyles.header}>
      <div style={layoutStyles.headerSearch}>
        <Search size={14} color="#428bb1" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          style={layoutStyles.headerSearchInput}
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      </div>

      <div style={layoutStyles.headerActions}>
        <button
          type="button"
          aria-label="Notifications"
          style={layoutStyles.headerIconButton}
          onClick={onNotificationClick}
        >
          <Bell size={18} />
        </button>

        <div style={layoutStyles.headerDivider} />

        <button
          type="button"
          style={layoutStyles.headerProfileButton}
          onClick={onProfileClick}
        >
          <Image
            src={userImageSrc}
            alt="User profile"
            width={28}
            height={28}
            style={layoutStyles.headerProfileImage}
          />
          <span style={layoutStyles.headerProfileName}>{userName}</span>
          <ChevronDown size={16} color="#64748b" />
        </button>
      </div>
    </header>
  );
}
