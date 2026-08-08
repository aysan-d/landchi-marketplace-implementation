import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { ProductGrid } from "@/components/product/ProductGrid";
import { productsByIdsQuery } from "@/lib/catalog";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/account/wishlist")({
  head: () => ({
    meta: [
      { title: "علاقه‌مندی‌ها | لندچی" },
      { name: "description", content: "کالاهای ذخیره‌شده در فهرست علاقه‌مندی‌های شما در لندچی." },
      { property: "og:title", content: "علاقه‌مندی‌ها | لندچی" },
      { property: "og:description", content: "فهرست کالاهای مورد علاقه شما در فروشگاه لندچی." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids } = useWishlist();
  const { data = [], isLoading } = useQuery(productsByIdsQuery(ids));

  return (
    <AppShell>
      <div className="container-landchi py-8">
        <h1 className="mb-4 text-lg font-bold">علاقه‌مندی‌ها</h1>
        <ProductGrid
          products={data}
          isLoading={isLoading && ids.length > 0}
          emptyTitle="هنوز کالایی به علاقه‌مندی‌ها اضافه نکرده‌اید."
        />
      </div>
    </AppShell>
  );
}
