import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, BookmarkPlus, ShoppingBag } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { EmptyState } from "@/components/common/States";
import { useCart } from "@/lib/cart";
import { faNumber, finalPrice, toFa } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "سبد خرید | لندچی" },
      { name: "description", content: "مشاهده و ویرایش کالاهای سبد خرید شما در فروشگاه لندچی." },
      { property: "og:title", content: "سبد خرید | لندچی" },
      { property: "og:description", content: "کالاهای انتخابی خود را بررسی و نهایی کنید." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQuantity, remove, saveForLater } = useCart();
  const active = lines.filter((l) => !l.savedForLater);
  const saved = lines.filter((l) => l.savedForLater);

  const subtotal = active.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const payable = active.reduce(
    (sum, l) => sum + finalPrice(l.unitPrice, l.discountPercent) * l.quantity,
    0,
  );
  const discount = subtotal - payable;
  const shipping = payable > 1_000_000 || payable === 0 ? 0 : 89_000;

  return (
    <AppShell>
      <div className="container-landchi py-6">
        <h1 className="mb-4 text-lg font-bold">سبد خرید</h1>

        {active.length === 0 ? (
          <EmptyState
            title="سبد خرید شما خالی است."
            description="از میان هزاران کالای لندچی انتخاب کنید."
            action={
              <Link
                to="/"
                className="rounded-lg bg-primary px-4 py-2 text-xs text-primary-foreground"
              >
                شروع خرید
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
            <ul className="space-y-2.5">
              {active.map((line) => (
                <li
                  key={line.productId}
                  className="grid grid-cols-[80px_minmax(0,1fr)] gap-3 rounded-xl border border-border bg-card p-3 sm:grid-cols-[96px_minmax(0,1fr)_auto]"
                >
                  <img
                    src={line.image ?? ""}
                    alt={line.name}
                    loading="lazy"
                    className="aspect-square w-full object-contain"
                  />
                  <div className="min-w-0">
                    <Link
                      to="/product/$slug"
                      params={{ slug: line.slug }}
                      className="line-clamp-2 text-xs hover:text-primary"
                    >
                      {line.name}
                    </Link>
                    {line.variantLabel && (
                      <p className="mt-1 text-[10px] text-muted-foreground">{line.variantLabel}</p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 rounded-lg border border-border px-2 py-1">
                        <button
                          type="button"
                          aria-label="کاهش"
                          onClick={() => setQuantity(line.productId, line.quantity - 1)}
                        >
                          <Minus className="size-3.5" strokeWidth={1.6} />
                        </button>
                        <span className="num text-[11px]">{toFa(line.quantity)}</span>
                        <button
                          type="button"
                          aria-label="افزایش"
                          onClick={() => setQuantity(line.productId, line.quantity + 1)}
                        >
                          <Plus className="size-3.5" strokeWidth={1.6} />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => saveForLater(line.productId, true)}
                        className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-primary"
                      >
                        <BookmarkPlus className="size-3.5" strokeWidth={1.6} />
                        ذخیره برای بعد
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(line.productId)}
                        className="flex items-center gap-1 text-[10px] text-sale"
                      >
                        <Trash2 className="size-3.5" strokeWidth={1.6} />
                        حذف
                      </button>
                    </div>
                  </div>
                  <p className="num self-end text-xs font-bold sm:self-center">
                    {faNumber(finalPrice(line.unitPrice, line.discountPercent) * line.quantity)}{" "}
                    <span className="text-[10px] font-normal">تومان</span>
                  </p>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-xl border border-border bg-card p-4 lg:sticky lg:top-32">
              <dl className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">قیمت کالاها</dt>
                  <dd className="num">{faNumber(subtotal)} تومان</dd>
                </div>
                <div className="flex justify-between text-sale">
                  <dt>سود شما از خرید</dt>
                  <dd className="num">{faNumber(discount)} تومان</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">هزینه ارسال</dt>
                  <dd className="num">{shipping ? `${faNumber(shipping)} تومان` : "رایگان"}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-sm font-bold">
                  <dt>مبلغ قابل پرداخت</dt>
                  <dd className="num text-primary">{faNumber(payable + shipping)} تومان</dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-dark"
              >
                <ShoppingBag className="size-4" strokeWidth={1.6} />
                ادامه فرآیند خرید
              </Link>
            </aside>
          </div>
        )}

        {saved.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-bold">ذخیره‌شده برای بعد</h2>
            <ul className="space-y-2">
              {saved.map((line) => (
                <li
                  key={line.productId}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <img src={line.image ?? ""} alt={line.name} className="size-14 object-contain" />
                  <span className="line-clamp-1 flex-1 text-xs">{line.name}</span>
                  <button
                    type="button"
                    onClick={() => saveForLater(line.productId, false)}
                    className="rounded-lg border border-border px-3 py-1.5 text-[10px]"
                  >
                    بازگرداندن به سبد
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </AppShell>
  );
}
