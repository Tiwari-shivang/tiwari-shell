import type { AppLayoutProps } from "../../types/layout.js";
import { Header } from "../Header/index.js";
import { Sidebar } from "../Sidebar/index.js";

export default function AppLayout({ children, header, sidebar }: AppLayoutProps) {
  return (
    <div className="zs-layout-root">
      <Sidebar {...sidebar} />
      <Header {...header} />
      <main className="zs-layout-content">{children}</main>
    </div>
  );
}
