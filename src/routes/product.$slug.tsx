import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import {
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  Repeat2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SectionShell } from "@/components/common/SectionShell";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { ErrorState, LoadingState } from "@/components/common/States";
import { InstallmentBox } from "@/components/product/InstallmentBox";
import {
  productImagesQuery,
  productQuery,
  productVariantsQuery,
  productsQuery,
  reviewsQuery,
} from "@/lib/catalog";
import { faDate, faNumber, faPercent, finalPrice, toFa } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useCompare } from "@/lib/compare";

export const Route = createFileRoute("/product/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `خرید ${params.slug.replace(/-/g, " ")} | لندچی` },
      {
        name: "description",
        content: "مشخصات کامل، قیمت روز، نظرات کاربران و امکان خرید اقساطی این کالا در لندچی.",
      },
      { property: "og:title", content: "جزئیات کالا | لندچی" },
      { property: "og:description", content: "قیمت، مشخصات و خرید اقساطی کالا در لندچی." },
    ],
  }),
  component: ProductPage,
  errorComponent: () => <ErrorState />,
  notFoundComponent: () => (
    <AppShell>
      <p className="container-landchi py-20 text-center text-sm">این کالا پیدا نشد.</p>
    </AppShell>
  ),
});

const TABS = [
  { id: "specs", label: "مشخصات" },
  { id: "description", label: "توضیحات" },
  { id: "reviews", label: "نظرات کاربران" },
] as const;

function ProductPage() {
  const { slug } = Route.useParams();
  const { data: product, isLoading, isError, refetch } = useQuery(productQuery(slug));
  const { data: images = [] } = useQuery(productImagesQuery(product?.id));
  const { data: variants = [] } = useQuery(productVariantsQuery(product?.id));
  const { data: reviews = [] } = useQuery(reviewsQuery(product?.id));
  const { data: related } = useQuery(
    productsQuery({ pageSize: 12, sort: "bestseller", ...(product ? {} : {}) }),
  );

  const { add } = useCart();
  const wishlist = useWishlist();
  const compare = useCompare();

  const [activeImage, setActiveImage] = useState(0);
  const [variantId, setVariantId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("specs");

  if (isLoading) {
    return (
      <AppShell>
        <div className="container-landchi py-8">
          <LoadingState rows={6} />
        </div>
      </AppShell>
    );
  }
  if (isError) {
    return (
      <AppShell>
        <div className="container-landchi py-8">
          <ErrorState onRetry={() => refetch()} />
        </div>
      </AppShell>
    );
  }
  if (!product) throw notFound();

  const variant = variants.find((v) => v.id === variantId) ?? null;
  const base = product.price + (variant?.price_delta ?? 0);
  const price = finalPrice(base, product.discount_percent);
  const stock = variant ? variant.stock : product.stock;
  const outOfStock = stock <= 0;
  const gallery = images.length
    ? images.map((i) => i.url)
    : [product.image_url ?? "/images/p-phone.jpg"];

  function onAdd() {
    if (!product || outOfStock) return;
    add(product, quantity, variant ? `${variant.name}: ${variant.value}` : undefined);
    toast.success("محصول به سبد خرید اضافه شد");
  }

  return (
    <AppShell>
      <div className="container-landchi py-4">
        <nav className="mb-4 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            لندچی
          </Link>
          <ChevronLeft className="size-3" strokeWidth={1.6} />
          <span className="line-clamp-1 text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-5 rounded-xl border border-border bg-card p-4 lg:grid-cols-[minmax(0,380px)_1fr_260px]">
          {/* gallery */}
          <div>
            <img
              src={gallery[activeImage] ?? ""}
              alt={product.name}
              width={600}
              height={600}
              className="mx-auto aspect-square w-full max-w-[380px] object-contain"
            />
            {gallery.length > 1 && (
              <div className="mt-3 flex justify-center gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`size-14 overflow-hidden rounded-lg border p-1 ${
                      i === activeImage ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={src} alt="" loading="lazy" className="size-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* info */}
          <div className="min-w-0">
            <h1 className="text-base font-bold leading-7 lg:text-lg">{product.name}</h1>
            {product.subtitle && (
              <p className="mt-1 text-xs text-muted-foreground">{product.subtitle}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <Star className="size-3.5 fill-star text-star" strokeWidth={0} />
                <span className="num">{toFa(product.rating)}</span>
                <span className="text-muted-foreground">
                  ({toFa(product.reviews_count)} نظر)
                </span>
              </span>
              <span className="text-muted-foreground">
                کد کالا: <span className="num">{toFa(product.sku)}</span>
              </span>
            </div>

            {variants.length > 0 && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-medium">انتخاب {variants[0]?.name}</p>
                <div className="flex flex-wrap gap-2">
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setVariantId(v.id === variantId ? null : v.id)}
                      disabled={v.stock <= 0}
                      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] transition-colors disabled:opacity-40 ${
                        v.id === variantId ? "border-primary text-primary" : "border-border"
                      }`}
                    >
                      {v.hex && (
                        <span
                          className="size-3 rounded-full border border-border"
                          style={{ backgroundColor: v.hex }}
                        />
                      )}
                      {v.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ul className="mt-4 grid gap-2 text-[11px] text-foreground/80 sm:grid-cols-2">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" strokeWidth={1.5} />
                {product.warranty ?? "گارانتی اصالت کالا"}
              </li>
              <li className="flex items-center gap-1.5">
                <Truck className="size-4 text-primary" strokeWidth={1.5} />
                ارسال به سراسر ایران
              </li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => wishlist.toggle(product.id)}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px]"
              >
                <Heart
                  className={`size-4 ${wishlist.has(product.id) ? "fill-sale text-sale" : ""}`}
                  strokeWidth={1.5}
                />
                علاقه‌مندی
              </button>
              <button
                type="button"
                onClick={() => {
                  compare.toggle(product.id);
                  toast.success("لیست مقایسه به‌روزرسانی شد");
                }}
                className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-[11px]"
              >
                <Repeat2 className="size-4" strokeWidth={1.5} />
                مقایسه
              </button>
            </div>
          </div>

          {/* buy box */}
          <aside className="h-fit rounded-xl bg-surface p-4">
            {product.discount_percent > 0 && (
              <div className="mb-1 flex items-center justify-between">
                <span className="num rounded-md bg-sale px-1.5 py-0.5 text-[10px] text-primary-foreground">
                  {faPercent(product.discount_percent)}
                </span>
                <span className="num text-[11px] text-muted-foreground line-through">
                  {faNumber(base)}
                </span>
              </div>
            )}
            <p className="num text-lg font-black text-primary">
              {faNumber(price)} <span className="text-xs font-normal">تومان</span>
            </p>

            <div className="mt-3 flex items-center justify-between rounded-lg border border-border bg-background px-2 py-1.5">
              <button
                type="button"
                aria-label="کاهش"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="grid size-6 place-items-center text-primary"
              >
                <Minus className="size-4" strokeWidth={1.6} />
              </button>
              <span className="num text-xs">{toFa(quantity)}</span>
              <button
                type="button"
                aria-label="افزایش"
                onClick={() => setQuantity(Math.min(Math.max(stock, 1), quantity + 1))}
                className="grid size-6 place-items-center text-primary"
              >
                <Plus className="size-4" strokeWidth={1.6} />
              </button>
            </div>

            <button
              type="button"
              onClick={onAdd}
              disabled={outOfStock}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-dark disabled:opacity-40"
            >
              <ShoppingCart className="size-4" strokeWidth={1.6} />
              {outOfStock ? "ناموجود" : "افزودن به سبد خرید"}
            </button>

            {stock > 0 && stock <= 5 && (
              <p className="mt-2 text-center text-[10px] text-sale">
                تنها {toFa(stock)} عدد در انبار باقی مانده
              </p>
            )}

            {product.installment_available && (
              <div className="mt-4">
                <InstallmentBox price={price} />
              </div>
            )}
          </aside>
        </div>

        {/* tabs */}
        <div className="mt-4 rounded-xl border border-border bg-card">
          <div className="flex gap-1 border-b border-border px-3">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`px-3 py-3 text-xs transition-colors ${
                  tab === t.id
                    ? "border-b-2 border-primary font-medium text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="p-4">
            {tab === "specs" && (
              <table className="w-full text-[11px]">
                <tbody>
                  {(product.specifications ?? []).map((s) => (
                    <tr key={s.k} className="border-b border-border last:border-0">
                      <th className="w-40 py-2.5 text-start font-medium text-muted-foreground">
                        {s.k}
                      </th>
                      <td className="py-2.5">{s.v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "description" && (
              <p className="text-xs leading-7 text-foreground/85">
                {product.description ?? "توضیحاتی برای این کالا ثبت نشده است."}
              </p>
            )}
            {tab === "reviews" && (
              <div className="space-y-3">
                {reviews.length === 0 && (
                  <p className="text-xs text-muted-foreground">هنوز نظری ثبت نشده است.</p>
                )}
                {reviews.map((r) => (
                  <article key={r.id} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">{r.author_name ?? "کاربر لندچی"}</span>
                      <span className="num text-[10px] text-muted-foreground">
                        {faDate(r.created_at)}
                      </span>
                    </div>
                    <div className="mt-1 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 ${i < r.rating ? "fill-star text-star" : "text-border"}`}
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                    {r.title && <p className="mt-1.5 text-xs font-medium">{r.title}</p>}
                    {r.body && (
                      <p className="mt-1 text-[11px] leading-6 text-foreground/80">{r.body}</p>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <SectionShell title="کالاهای مشابه">
        <ProductCarousel
          products={(related?.items ?? []).filter((p) => p.id !== product.id).slice(0, 10)}
        />
      </SectionShell>
    </AppShell>
  );
}
