import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "وبلاگ لندچی | لندچی" },
      { name: "description", content: "مقاله‌ها و راهنمای خرید کالا در وبلاگ لندچی." },
      { property: "og:title", content: "وبلاگ لندچی | لندچی" },
      { property: "og:description", content: "مقاله‌ها و راهنمای خرید کالا در وبلاگ لندچی." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <div className="container-landchi py-8">
        <h1 className="mb-4 text-lg font-bold">وبلاگ لندچی</h1>
        <p className="text-xs text-muted-foreground">مطالب وبلاگ به‌زودی منتشر می‌شود.</p>
      </div>
    </AppShell>
  );
}
