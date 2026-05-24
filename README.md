# tiwari-shell

Shared shell layout components for Next.js applications.

## Install

```bash
npm install tiwari-shell
```

## Use in Next.js

Import the package stylesheet once at your app entry:

- App Router: `app/layout.tsx`
- Pages Router: `pages/_app.tsx`

```tsx
import "tiwari-shell/styles.css";
```

Then use components:

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
- Styles are intentionally exported as `tiwari-shell/styles.css` for explicit control in consuming apps.
