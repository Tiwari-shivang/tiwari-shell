# tiwari-shell

Shared shell layout components for Next.js applications.

## Install

```bash
npm install tiwari-shell
```

## Use in Next.js

Use components directly (no separate CSS import required):

```tsx
import { AppLayout } from "tiwari-shell";

export default function Page() {
  return (
    <AppLayout
      header={{
        userName: "Jane",
        userImageSrc: "/user.png",
      }}
      sidebar={{
        logoSrc: "/logo.png",
        navItems: [
          { label: "Dashboard", href: "/dashboard", icon: "/icons/home.svg" },
          { label: "Projects", href: "/projects", icon: "/icons/projects.svg" },
        ],
      }}
    >
      <div>Your content</div>
    </AppLayout>
  );
}
```

## Notes

- The package entry is client-compatible for Next.js component-library usage.
- Styles are inlined in components, so consumer apps do not need to import package CSS.
- Use root-relative paths in `sidebar.navItems[].href` (for example `"/dashboard"`) to keep client-side SPA navigation. External URLs intentionally trigger full navigation.
