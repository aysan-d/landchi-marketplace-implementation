import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/account/orders")({
  head: () => ({
    meta: [
      { title: "سفارش‌های من | لندچی" },
      { name: "description", content: "پیگیری وضعیت سفارش‌های ثبت‌شده در لندچی." },
      { property: "og:title", content: "سفارش‌های من | لندچی" },
      { property: "og:description", content: "پیگیری وضعیت سفارش‌های ثبت‌شده در لندچی." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <div className="container-landchi py-8">
        <h1 className="mb-4 text-lg font-bold">سفارش‌های من</h1>
        <p className="text-xs text-muted-foreground">هنوز سفارشی ثبت نشده است.</p>
      </div>
    </AppShell>
  );
}
