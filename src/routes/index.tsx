import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Truck, BadgePercent } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { SectionShell } from "@/components/common/SectionShell";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { bannersQuery, categoriesQuery, productsQuery } from "@/lib/catalog";
import type { Banner } from "@/lib/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "لندچی | خرید نقدی و اقساطی کالای اصل با ارسال به سراسر ایران" },
      {
        name: "description",
        content:
          "فروشگاه اینترنتی لندچی؛ خرید موبایل، لپ‌تاپ، لوازم خانگی، مد و پوشاک و زیبایی با پرداخت نقدی، اعتباری و اقساطی.",
      },
      { property: "og:title", content: "لندچی | خرید نقدی و اقساطی" },
      {
        property: "og:description",
        content: "هزاران کالای اصل با امکان خرید اقساطی تا ۲۴ ماهه در فروشگاه اینترنتی لندچی.",
      },
    ],
  }),
  component: HomePage,
});

function BannerTile({ banner, className = "" }: { banner: Banner; className?: string }) {
  return (
    <a
      href={banner.cta_url || "#"}
      className={`relative flex flex-col justify-center overflow-hidden rounded-xl p-5 ${className}`}
      style={{ backgroundColor: banner.bg_color ?? "var(--surface)" }}
    >
      {banner.image_url && (
        <img
          src={banner.image_url}
          alt={banner.title ?? ""}
          loading="lazy"
          className="pointer-events-none absolute inset-0 size-full object-cover"
        />
      )}
      <div className="relative">
        <p className="text-base font-bold text-foreground drop-shadow-sm">{banner.title}</p>
        {banner.subtitle && (
          <p className="mt-1 text-xs text-foreground/75">{banner.subtitle}</p>
        )}
        {banner.cta_text && (
          <span className="mt-3 inline-block rounded-lg bg-primary px-4 py-1.5 text-[11px] text-primary-foreground">
            {banner.cta_text}
          </span>
        )}
      </div>
    </a>
  );
}

function HomePage() {
  const { data: heroBanners = [] } = useQuery(bannersQuery("hero"));
  const { data: sideBanners = [] } = useQuery(bannersQuery("hero-side"));
  const { data: promoBanners = [] } = useQuery(bannersQuery("promo"));
  const { data: categories = [] } = useQuery(categoriesQuery());

  const { data: featured, isLoading: loadingFeatured } = useQuery(
    productsQuery({ featured: true, pageSize: 12 }),
  );
  const { data: deals, isLoading: loadingDeals } = useQuery(
    productsQuery({ dailyDeal: true, pageSize: 12 }),
  );
  const { data: top, isLoading: loadingTop } = useQuery(
    productsQuery({ sort: "bestseller", pageSize: 12 }),
  );

  const hero = heroBanners[0];

  return (
    <AppShell>
      <h1 className="sr-only">فروشگاه اینترنتی لندچی</h1>

      {/* 1. hero + campaign banners */}
      <section className="container-landchi pt-4">
        <div className="grid gap-2.5 lg:grid-cols-[1.6fr_1fr]">
          <a
            href={hero?.cta_url || "/installments/calculator"}
            className="relative flex min-h-[220px] items-center overflow-hidden rounded-xl bg-primary p-6 lg:min-h-[300px]"
          >
            <img
              src="/images/hero-installment.jpg"
              alt="خرید اقساطی از لندچی"
              width={1400}
              height={560}
              className="absolute inset-0 size-full object-cover"
            />
            <div className="relative ms-auto max-w-[46%] text-primary-foreground">
              <p className="text-xl font-black leading-relaxed lg:text-3xl">
                {hero?.title ?? "نگران پولش نباش"}
              </p>
              <p className="mt-1 text-lg lg:text-2xl">{hero?.subtitle ?? "قسطی خرید کن"}</p>
              <span className="mt-4 inline-block rounded-lg bg-primary-foreground px-6 py-2 text-xs font-medium text-primary">
                {hero?.cta_text ?? "خرید"}
              </span>
            </div>
          </a>

          <div className="grid grid-cols-2 gap-2.5">
            {sideBanners.slice(0, 3).map((b, i) => (
              <BannerTile
                key={b.id}
                banner={b}
                className={i === 0 ? "col-span-2 min-h-[130px]" : "min-h-[130px]"}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2 + 3. special offers carousel on plum surface */}
      <div className="mt-6">
        <SectionShell title="پیشنهادها ویژه" tone="plum" href="/search">
          <ProductCarousel products={featured?.items ?? []} isLoading={loadingFeatured} />
        </SectionShell>
      </div>

      {/* 4. promotional banners */}
      <section className="container-landchi pt-6">
        <div className="grid gap-2.5 md:grid-cols-3">
          {promoBanners.map((b) => (
            <BannerTile key={b.id} banner={b} className="min-h-[140px]" />
          ))}
        </div>
      </section>

      {/* 5. categories */}
      <section className="container-landchi pt-6">
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto pb-1">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="flex w-[86px] shrink-0 flex-col items-center gap-2"
            >
              <span
                className="grid size-16 place-items-center rounded-xl text-xl"
                style={{ backgroundColor: c.color ?? "var(--surface)" }}
              >
                {c.name.slice(0, 1)}
              </span>
              <span className="text-center text-[10px] leading-4 text-foreground/80">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6 + 7. daily deals */}
      <SectionShell title="تخفیف‌های روزانه" href="/search">
        <ProductCarousel products={deals?.items ?? []} isLoading={loadingDeals} />
      </SectionShell>

      {/* 8. campaign strip */}
      <section className="container-landchi">
        <div className="grid gap-2.5 sm:grid-cols-2">
          <div className="flex items-center gap-3 rounded-xl bg-warning-soft p-4">
            <Truck className="size-8 shrink-0 text-primary" strokeWidth={1.3} />
            <div>
              <p className="text-sm font-bold">ارسال رایگان</p>
              <p className="text-xs text-foreground/70">برای خرید بالای ۱ میلیون تومان!</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-sale-soft p-4">
            <BadgePercent className="size-8 shrink-0 text-primary" strokeWidth={1.3} />
            <div>
              <p className="text-sm font-bold">تخفیف ویژه</p>
              <p className="text-xs text-foreground/70">برای خرید بالای ۱ میلیون تومان!</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. top products */}
      <div className="mt-2">
        <SectionShell title="پر بازدیدترین ها" tone="plum" href="/search">
          <ProductCarousel products={top?.items ?? []} isLoading={loadingTop} />
        </SectionShell>
      </div>
    </AppShell>
  );
}
