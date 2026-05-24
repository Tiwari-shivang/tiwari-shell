import type { AppLayoutProps } from "../../types/layout";
import { Header } from "../Header";
import { Sidebar } from "../Sidebar";

export default function AppLayout({ children, header, sidebar }: AppLayoutProps) {
  return (
    <div className="zs-layout-root">
      <Sidebar {...sidebar} />
      <Header {...header} />
      <main className="zs-layout-content">{children}</main>
    </div>
  );
}
