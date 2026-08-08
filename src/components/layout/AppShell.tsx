import type { ReactNode } from "react";
import { TopBar } from "./TopBar";
import { MainHeader } from "./MainHeader";
import { Footer } from "./Footer";
import { MobileBottomNav } from "./MobileBottomNav";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <TopBar />
      <MainHeader />
      <main className="flex-1 pb-16 lg:pb-0">{children}</main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
