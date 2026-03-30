import { ReactNode } from "react";
import TopBar from "./layout/TopBar";
import FooterNew from "./layout/Footer";
import AuroraBackground from "./layout/AuroraBackground";
import DockNav from "./layout/DockNav";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <>
      <AuroraBackground />
      <TopBar />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      <FooterNew />
      <DockNav />
    </>
  );
}
