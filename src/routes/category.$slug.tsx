import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ErrorState } from "@/components/common/States";
import { Filters } from "@/components/catalog/Filters";
import { SortBar } from "@/components/catalog/SortBar";
import { Pagination } from "@/components/catalog/Pagination";
import { categoriesQuery, productsQuery, type SortValue } from "@/lib/catalog";
import { toFa } from "@/lib/format";

const PAGE_SIZE = 15;

type Search = { sort: SortValue; page: number; brands?: string };

export const Route = createFileRoute("/category/$slug")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    sort: (search["sort"] as SortValue) || "bestseller",
    page: Number(search["page"]) || 1,
    ...(search["brands"] ? { brands: String(search["brands"]) } : {}),
  }),
  head: ({ params }) => ({
    meta: [
      { title: `خرید ${params.slug} | لندچی` },
      {
        name: "description",
        content: "مشاهده و خرید محصولات این دسته‌بندی با امکان پرداخت نقدی و اقساطی در لندچی.",
      },
      { property: "og:title", content: "دسته‌بندی محصولات لندچی" },
      { property: "og:description", content: "خرید نقدی و اقساطی کالای اصل از لندچی." },
    ],
  }),
  component: CategoryPage,
  errorComponent: () => <ErrorState />,
  notFoundComponent: () => <p className="p-10 text-center text-sm">دسته‌بندی پیدا نشد.</p>,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const search = Route.useSearch();
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});
  const [inStock, setInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);

  const { data: categories = [] } = useQuery(categoriesQuery());
  const category = categories.find((c) => c.slug === slug);
  const brandSlugs = search.brands ? search.brands.split(",") : [];

  const { data, isLoading, isError, refetch } = useQuery(
    productsQuery({
      categorySlug: slug,
      sort: search.sort,
      page: search.page,
      pageSize: PAGE_SIZE,
      ...(brandSlugs.length ? { brandSlugs } : {}),
      ...(priceRange.min != null ? { minPrice: priceRange.min } : {}),
      ...(priceRange.max != null ? { maxPrice: priceRange.max } : {}),
      ...(minRating != null ? { minRating } : {}),
      ...(inStock ? { inStock: true } : {}),
      ...(onlyDiscounted ? { onlyDiscounted: true } : {}),
    }),
  );

  return (
    <AppShell>
      <div className="bg-primary py-10 text-primary-foreground">
        <div className="container-landchi flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">{category?.name ?? "دسته‌بندی"}</h1>
            <p className="mt-1 text-sm opacity-90">تا ۴۰٪ تخفیف</p>
          </div>
          <span className="rounded-lg bg-primary-foreground px-6 py-2 text-xs font-medium text-primary">
            خرید
          </span>
        </div>
      </div>

      <div className="container-landchi py-4">
        <nav className="mb-4 flex items-center gap-1 text-[11px] text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            لندچی
          </Link>
          <ChevronLeft className="size-3" strokeWidth={1.6} />
          <span className="text-foreground">{category?.name}</span>
        </nav>

        <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
          <Filters
            selectedBrands={brandSlugs}
            priceRange={priceRange}
            onPriceRange={setPriceRange}
            inStock={inStock}
            onInStock={setInStock}
            onlyDiscounted={onlyDiscounted}
            onOnlyDiscounted={setOnlyDiscounted}
            minRating={minRating}
            onMinRating={setMinRating}
          />

          <div>
            <SortBar
              count={data?.count ?? 0}
              value={search.sort}
              to="/category/$slug"
              params={{ slug }}
            />
            {isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : (
              <>
                <ProductGrid products={data?.items ?? []} isLoading={isLoading} />
                <Pagination
                  page={search.page}
                  pageCount={Math.max(1, Math.ceil((data?.count ?? 0) / PAGE_SIZE))}
                  to="/category/$slug"
                  params={{ slug }}
                  sort={search.sort}
                />
                <p className="mt-4 text-center text-[11px] text-muted-foreground">
                  {toFa(data?.count ?? 0)} کالا در این دسته‌بندی
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
