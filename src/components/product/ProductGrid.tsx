import type { Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { EmptyState, LoadingState } from "@/components/common/States";

export function ProductGrid({
  products,
  isLoading,
  emptyTitle,
}: {
  products: Product[];
  isLoading?: boolean;
  emptyTitle?: string;
}) {
  if (isLoading) return <LoadingState rows={12} />;
  if (!products.length) return <EmptyState {...(emptyTitle ? { title: emptyTitle } : {})} />;

  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
