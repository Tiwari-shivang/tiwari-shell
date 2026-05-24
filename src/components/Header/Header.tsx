import Image from "next/image";
import { Bell, ChevronDown, Search } from "lucide-react";

import type { HeaderProps } from "../../types/layout";

export default function Header({
  userName = "User",
  userImageSrc,
  searchPlaceholder = "Search",
  onSearchChange,
  onNotificationClick,
  onProfileClick,
}: HeaderProps) {
  return (
    <header className="zs-header">
      <div className="zs-header-search">
        <Search size={14} className="zs-header-search-icon" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="zs-header-search-input"
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      </div>

      <div className="zs-header-actions">
        <button
          type="button"
          aria-label="Notifications"
          className="zs-header-icon-button"
          onClick={onNotificationClick}
        >
          <Bell size={18} />
        </button>

        <div className="zs-header-divider" />

        <button
          type="button"
          className="zs-header-profile-button"
          onClick={onProfileClick}
        >
          <Image
            src={userImageSrc}
            alt="User profile"
            width={28}
            height={28}
            className="zs-header-profile-image"
          />
          <span className="zs-header-profile-name">{userName}</span>
          <ChevronDown size={16} className="zs-header-profile-chevron" />
        </button>
      </div>
    </header>
  );
}
