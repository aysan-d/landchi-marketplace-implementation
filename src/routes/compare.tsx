import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/common/States";
import { productsByIdsQuery } from "@/lib/catalog";
import { useCompare } from "@/lib/compare";
import { faNumber, finalPrice, toFa } from "@/lib/format";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "مقایسه کالاها | لندچی" },
      { name: "description", content: "مقایسه مشخصات، قیمت و امتیاز کالاها در فروشگاه لندچی." },
      { property: "og:title", content: "مقایسه کالاها | لندچی" },
      { property: "og:description", content: "کالاها را کنار هم بگذارید و بهترین را انتخاب کنید." },
    ],
  }),
  component: ComparePage,
});

function ComparePage() {
  const { ids, toggle, clear } = useCompare();
  const { data = [] } = useQuery(productsByIdsQuery(ids));

  const specKeys = [...new Set(data.flatMap((p) => (p.specifications ?? []).map((s) => s.k)))];

  return (
    <AppShell>
      <div className="container-landchi py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">مقایسه کالاها</h1>
          {data.length > 0 && (
            <button onClick={clear} className="text-[11px] text-sale">
              پاک کردن لیست
            </button>
          )}
        </div>

        {data.length === 0 ? (
          <EmptyState title="کالایی برای مقایسه انتخاب نشده است." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-border bg-card">
            <table className="w-full min-w-[640px] text-[11px]">
              <thead>
                <tr>
                  <th className="w-32" />
                  {data.map((p) => (
                    <th key={p.id} className="p-3 text-center align-top">
                      <img
                        src={p.image_url ?? ""}
                        alt={p.name}
                        className="mx-auto size-24 object-contain"
                      />
                      <p className="mt-2 line-clamp-2 text-[11px] font-medium">{p.name}</p>
                      <button onClick={() => toggle(p.id)} className="mt-1 text-[10px] text-sale">
                        حذف
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border">
                  <th className="p-3 text-start text-muted-foreground">قیمت</th>
                  {data.map((p) => (
                    <td key={p.id} className="num p-3 text-center font-bold text-primary">
                      {faNumber(finalPrice(p.price, p.discount_percent))} تومان
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-border">
                  <th className="p-3 text-start text-muted-foreground">امتیاز</th>
                  {data.map((p) => (
                    <td key={p.id} className="num p-3 text-center">
                      {toFa(p.rating)}
                    </td>
                  ))}
                </tr>
                {specKeys.map((key) => (
                  <tr key={key} className="border-t border-border">
                    <th className="p-3 text-start text-muted-foreground">{key}</th>
                    {data.map((p) => (
                      <td key={p.id} className="p-3 text-center">
                        {(p.specifications ?? []).find((s) => s.k === key)?.v ?? "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
}
