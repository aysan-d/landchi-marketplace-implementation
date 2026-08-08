import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "ورود یا ثبت‌نام | لندچی" },
      { name: "description", content: "ورود به حساب کاربری فروشگاه اینترنتی لندچی." },
      { property: "og:title", content: "ورود یا ثبت‌نام | لندچی" },
      { property: "og:description", content: "ورود به حساب کاربری فروشگاه اینترنتی لندچی." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <div className="container-landchi py-8">
        <h1 className="mb-4 text-lg font-bold">ورود یا ثبت‌نام</h1>
        <p className="text-xs text-muted-foreground">ورود با شماره موبایل و ایمیل به‌زودی فعال می‌شود.</p>
      </div>
    </AppShell>
  );
}
