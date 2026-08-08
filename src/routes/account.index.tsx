import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/account/")({
  head: () => ({
    meta: [
      { title: "حساب کاربری | لندچی" },
      { name: "description", content: "مدیریت سفارش‌ها، آدرس‌ها و اطلاعات حساب کاربری لندچی." },
      { property: "og:title", content: "حساب کاربری | لندچی" },
      { property: "og:description", content: "مدیریت سفارش‌ها، آدرس‌ها و اطلاعات حساب کاربری لندچی." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <div className="container-landchi py-8">
        <h1 className="mb-4 text-lg font-bold">حساب کاربری</h1>
        <p className="text-xs text-muted-foreground">اطلاعات حساب کاربری شما در این بخش نمایش داده می‌شود.</p>
      </div>
    </AppShell>
  );
}
