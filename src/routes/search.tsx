import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Filters } from "@/components/catalog/Filters";
import { SortBar } from "@/components/catalog/SortBar";
import { Pagination } from "@/components/catalog/Pagination";
import { ErrorState } from "@/components/common/States";
import { productsQuery, type SortValue } from "@/lib/catalog";

const PAGE_SIZE = 15;

export const Route = createFileRoute("/search")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { q: string; sort: SortValue; page: number; brands?: string } => ({
    q: String(search["q"] ?? ""),
    sort: (search["sort"] as SortValue) || "relevant",
    page: Number(search["page"]) || 1,
    ...(search["brands"] ? { brands: String(search["brands"]) } : {}),
  }),
  head: () => ({
    meta: [
      { title: "جستجوی کالا در لندچی" },
      { name: "description", content: "جستجو در میان هزاران کالای اصل فروشگاه اینترنتی لندچی." },
      { property: "og:title", content: "جستجوی کالا در لندچی" },
      { property: "og:description", content: "نتایج جستجوی کالا در فروشگاه اینترنتی لندچی." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const search = Route.useSearch();
  const [priceRange, setPriceRange] = useState<{ min?: number; max?: number }>({});
  const [inStock, setInStock] = useState(false);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [minRating, setMinRating] = useState<number | undefined>(undefined);
  const brandSlugs = search.brands ? search.brands.split(",") : [];

  const { data, isLoading, isError, refetch } = useQuery(
    productsQuery({
      sort: search.sort,
      page: search.page,
      pageSize: PAGE_SIZE,
      ...(search.q ? { search: search.q } : {}),
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
      <div className="container-landchi py-5">
        <h1 className="mb-4 text-lg font-bold">
          {search.q ? `نتایج جستجو برای «${search.q}»` : "همه کالاها"}
        </h1>
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
            <SortBar count={data?.count ?? 0} value={search.sort} to="/search" />
            {isError ? (
              <ErrorState onRetry={() => refetch()} />
            ) : (
              <>
                <ProductGrid
                  products={data?.items ?? []}
                  isLoading={isLoading}
                  emptyTitle="کالایی با این مشخصات پیدا نشد."
                />
                <Pagination
                  page={search.page}
                  pageCount={Math.max(1, Math.ceil((data?.count ?? 0) / PAGE_SIZE))}
                  to="/search"
                  sort={search.sort}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
