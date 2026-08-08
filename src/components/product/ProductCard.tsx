import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/catalog";
import { faNumber, faPercent, finalPrice, toFa } from "@/lib/format";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const [adding, setAdding] = useState(false);

  const price = finalPrice(product.price, product.discount_percent);
  const outOfStock = product.stock <= 0;
  const lowStock = !outOfStock && product.stock <= 5;
  const liked = has(product.id);

  function onAdd() {
    if (outOfStock) return;
    setAdding(true);
    add(product, 1);
    toast.success("محصول به سبد خرید اضافه شد");
    setTimeout(() => setAdding(false), 800);
  }

  return (
    <article className="group relative flex h-full flex-col rounded-xl border border-border bg-card p-2.5 transition-shadow hover:shadow-pop">
      <div className="mb-1 flex items-start justify-between">
        {product.discount_percent > 0 ? (
          <span className="rounded-md bg-sale-soft px-1.5 py-0.5 text-[9px] font-medium text-sale">
            تخفیف ویژه
          </span>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={() => toggle(product.id)}
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="text-muted-foreground transition-colors hover:text-sale"
        >
          <Heart
            className={`size-4 ${liked ? "fill-sale text-sale" : ""}`}
            strokeWidth={1.5}
          />
        </button>
      </div>

      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block"
        aria-label={product.name}
      >
        <img
          src={product.image_url ?? ""}
          alt={product.name}
          loading="lazy"
          width={280}
          height={280}
          className={`mx-auto aspect-square w-full object-contain transition-transform group-hover:scale-[1.03] ${
            outOfStock ? "opacity-40 grayscale" : ""
          }`}
        />
      </Link>

      <div className="mt-1 flex items-center justify-between">
        {product.installment_available && (
          <span className="rounded-md bg-installment px-1.5 py-0.5 text-[9px] text-primary-foreground">
            قسط
          </span>
        )}
        {product.discount_percent > 0 && (
          <span className="num text-[10px] text-muted-foreground line-through">
            {faNumber(product.price)} تومان
          </span>
        )}
      </div>

      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="mt-1.5 line-clamp-2 min-h-[2.4rem] text-[11px] leading-5 text-foreground/85 hover:text-primary"
      >
        {product.name}
      </Link>

      <div className="mt-1 flex items-center justify-between">
        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
          <Star className="size-3 fill-star text-star" strokeWidth={0} />
          <span className="num">{toFa(product.rating)}</span>
        </span>
        {product.discount_percent > 0 && (
          <span className="num rounded-md bg-sale px-1.5 py-0.5 text-[9px] text-primary-foreground">
            {faPercent(product.discount_percent)}
          </span>
        )}
      </div>

      <div className="mt-auto flex items-end justify-between pt-2">
        <button
          type="button"
          onClick={onAdd}
          disabled={outOfStock}
          aria-label="افزودن به سبد خرید"
          className="grid size-7 place-items-center rounded-lg border border-border text-primary transition-colors hover:bg-accent disabled:opacity-40"
        >
          <ShoppingCart className={`size-4 ${adding ? "animate-bounce" : ""}`} strokeWidth={1.5} />
        </button>
        {outOfStock ? (
          <span className="text-[11px] text-muted-foreground">ناموجود</span>
        ) : (
          <span className="num text-[12px] font-bold">
            {faNumber(price)} <span className="text-[10px] font-normal">تومان</span>
          </span>
        )}
      </div>

      {lowStock && (
        <span className="mt-1 text-[9px] text-sale">تنها {toFa(product.stock)} عدد باقی مانده</span>
      )}
    </article>
  );
}
