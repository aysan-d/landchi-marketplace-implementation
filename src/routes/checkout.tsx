import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "تکمیل خرید | لندچی" },
      { name: "description", content: "انتخاب آدرس، روش ارسال و پرداخت نقدی، اعتباری یا اقساطی در لندچی." },
      { property: "og:title", content: "تکمیل خرید | لندچی" },
      { property: "og:description", content: "انتخاب آدرس، روش ارسال و پرداخت نقدی، اعتباری یا اقساطی در لندچی." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <AppShell>
      <div className="container-landchi py-8">
        <h1 className="mb-4 text-lg font-bold">تکمیل خرید</h1>
        <p className="text-xs text-muted-foreground">فرآیند پرداخت نقدی، اعتباری و اقساطی به‌زودی در این صفحه فعال می‌شود.</p>
      </div>
    </AppShell>
  );
}
