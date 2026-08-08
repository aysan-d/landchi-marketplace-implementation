import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { LoadingState } from "@/components/common/States";

export function ProductCarousel({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * 600, behavior: "smooth" });
  }

  if (isLoading) return <LoadingState rows={6} />;
  if (!products.length) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex snap-x gap-2.5 overflow-x-auto scroll-smooth pb-1"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[19%] xl:w-[15.4%]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="بعدی"
        className="absolute -start-3 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background shadow-card lg:grid"
      >
        <ChevronRight className="size-4" strokeWidth={1.6} />
      </button>
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="قبلی"
        className="absolute -end-3 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-background shadow-card lg:grid"
      >
        <ChevronLeft className="size-4" strokeWidth={1.6} />
      </button>
    </div>
  );
}
