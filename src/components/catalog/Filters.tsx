import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Filter } from "lucide-react";
import { useState } from "react";
import { brandsQuery } from "@/lib/catalog";
import { faNumber, toFa } from "@/lib/format";

const PRICE_BUCKETS = [
  { label: "۱ - ۱۰ میلیون تومان", min: 1_000_000, max: 10_000_000 },
  { label: "۱۰ - ۲۵ میلیون تومان", min: 10_000_000, max: 25_000_000 },
  { label: "۲۵ - ۵۰ میلیون تومان", min: 25_000_000, max: 50_000_000 },
  { label: "۵۰ - ۱۰۰ میلیون تومان", min: 50_000_000, max: 100_000_000 },
  { label: "بالای ۱۰۰ میلیون تومان", min: 100_000_000, max: undefined },
];

const COLORS = [
  { label: "آبی", hex: "#2563EB" },
  { label: "قرمز", hex: "#DC2626" },
  { label: "سبز", hex: "#16A34A" },
  { label: "نارنجی", hex: "#EA580C" },
  { label: "مشکی", hex: "#111827" },
  { label: "سفید", hex: "#FFFFFF" },
];

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-xs font-medium"
      >
        {title}
        <ChevronDown
          className={`size-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          strokeWidth={1.6}
        />
      </button>
      {open && <div className="pb-3">{children}</div>}
    </div>
  );
}

export function Filters({
  selectedBrands,
  priceRange,
  onPriceRange,
  inStock,
  onInStock,
  onlyDiscounted,
  onOnlyDiscounted,
  minRating,
  onMinRating,
}: {
  selectedBrands: string[];
  priceRange: { min?: number; max?: number };
  onPriceRange: (range: { min?: number; max?: number }) => void;
  inStock: boolean;
  onInStock: (value: boolean) => void;
  onlyDiscounted: boolean;
  onOnlyDiscounted: (value: boolean) => void;
  minRating: number | undefined;
  onMinRating: (value: number | undefined) => void;
}) {
  const navigate = useNavigate();
  const { data: brands = [] } = useQuery(brandsQuery());

  function toggleBrand(slug: string) {
    const next = selectedBrands.includes(slug)
      ? selectedBrands.filter((b) => b !== slug)
      : [...selectedBrands, slug];
    navigate({
      to: ".",
      search: (prev: Record<string, unknown>) => ({
        ...prev,
        page: 1,
        brands: next.join(",") || undefined,
      }),
    });
  }

  return (
    <aside className="h-fit rounded-xl border border-border bg-card px-3 lg:sticky lg:top-32">
      <div className="flex items-center gap-1.5 border-b border-border py-3 text-xs font-bold">
        <Filter className="size-4 text-primary" strokeWidth={1.6} />
        فیلترها
      </div>

      <label className="flex items-center justify-between py-3 text-xs">
        فقط کالاهای موجود
        <input
          type="checkbox"
          checked={inStock}
          onChange={(e) => onInStock(e.target.checked)}
          className="size-4 accent-primary"
        />
      </label>

      <Section title="بر اساس قیمت">
        <ul className="space-y-2">
          {PRICE_BUCKETS.map((b) => (
            <li key={b.label}>
              <label className="flex items-center justify-between text-[11px] text-foreground/80">
                {b.label}
                <input
                  type="checkbox"
                  checked={priceRange.min === b.min}
                  onChange={(e) =>
                    onPriceRange(
                      e.target.checked
                        ? { min: b.min, ...(b.max ? { max: b.max } : {}) }
                        : {},
                    )
                  }
                  className="size-4 accent-primary"
                />
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center gap-2">
          <input
            placeholder="از"
            inputMode="numeric"
            value={priceRange.min ? faNumber(priceRange.min) : ""}
            onChange={(e) =>
              onPriceRange({ ...priceRange, min: Number(e.target.value.replace(/\D/g, "")) })
            }
            className="h-8 w-full rounded-lg border border-border bg-surface px-2 text-[11px] outline-none"
          />
          <input
            placeholder="تا"
            inputMode="numeric"
            value={priceRange.max ? faNumber(priceRange.max) : ""}
            onChange={(e) =>
              onPriceRange({ ...priceRange, max: Number(e.target.value.replace(/\D/g, "")) })
            }
            className="h-8 w-full rounded-lg border border-border bg-surface px-2 text-[11px] outline-none"
          />
        </div>
      </Section>

      <Section title="بر اساس رنگ">
        <div className="flex flex-wrap gap-1.5">
          {COLORS.map((c) => (
            <span
              key={c.label}
              className="flex items-center gap-1 rounded-full border border-border px-2 py-1 text-[10px]"
            >
              <span
                className="size-2.5 rounded-full border border-border"
                style={{ backgroundColor: c.hex }}
              />
              {c.label}
            </span>
          ))}
        </div>
      </Section>

      <Section title="بر اساس برند">
        <ul className="max-h-56 space-y-2 overflow-auto">
          {brands.map((b) => (
            <li key={b.id}>
              <label className="flex items-center justify-between text-[11px] text-foreground/80">
                {b.name}
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b.slug)}
                  onChange={() => toggleBrand(b.slug)}
                  className="size-4 accent-primary"
                />
              </label>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="امتیاز" defaultOpen={false}>
        <ul className="space-y-2">
          {[4, 3, 2].map((r) => (
            <li key={r}>
              <label className="flex items-center justify-between text-[11px] text-foreground/80">
                {toFa(r)} ستاره و بالاتر
                <input
                  type="checkbox"
                  checked={minRating === r}
                  onChange={(e) => onMinRating(e.target.checked ? r : undefined)}
                  className="size-4 accent-primary"
                />
              </label>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="تخفیف" defaultOpen={false}>
        <label className="flex items-center justify-between text-[11px] text-foreground/80">
          فقط کالاهای تخفیف‌دار
          <input
            type="checkbox"
            checked={onlyDiscounted}
            onChange={(e) => onOnlyDiscounted(e.target.checked)}
            className="size-4 accent-primary"
          />
        </label>
      </Section>
    </aside>
  );
}
