import type { AppLayoutProps } from "../../types/layout.js";
import { layoutStyles } from "../../styles/layoutStyles.js";
import { Header } from "../Header/index.js";
import { Sidebar } from "../Sidebar/index.js";

export default function AppLayout({ children, header, sidebar }: AppLayoutProps) {
  return (
    <div style={layoutStyles.root}>
      <Sidebar {...sidebar} />
      <Header {...header} />
      <main style={layoutStyles.content}>{children}</main>
    </div>
  );
}
