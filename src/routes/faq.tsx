import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "سوالات متداول | لندچی" },
      { name: "description", content: "پاسخ پرسش‌های پرتکرار درباره خرید نقدی و اقساطی از لندچی." },
      { property: "og:title", content: "سوالات متداول | لندچی" },
      { property: "og:description", content: "پاسخ پرسش‌های پرتکرار درباره خرید نقدی و اقساطی از لندچی." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <div className="container-landchi py-8">
        <h1 className="mb-4 text-lg font-bold">سوالات متداول</h1>
        <p className="text-xs text-muted-foreground">پرسش‌های متداول به‌زودی منتشر می‌شود.</p>
      </div>
    </AppShell>
  );
}
