import { Link } from "@tanstack/react-router";
import { SORT_OPTIONS, type SortValue } from "@/lib/catalog";
import { toFa } from "@/lib/format";

export function SortBar({
  count,
  value,
  to,
  params,
}: {
  count: number;
  value: SortValue;
  to: "/category/$slug" | "/search";
  params?: { slug: string };
}) {
  return (
    <div className="mb-3 flex items-center gap-3 overflow-x-auto rounded-xl border border-border bg-card px-3 py-2">
      <span className="shrink-0 text-[11px] text-muted-foreground">مرتب سازی بر اساس</span>
      <div className="no-scrollbar flex items-center gap-1.5 overflow-x-auto">
        {SORT_OPTIONS.map((option) => {
          const active = option.value === value;
          return (
            <Link
              key={option.value}
              to={to}
              {...(params ? { params } : {})}
              search={(prev: Record<string, unknown>) => ({
                ...prev,
                sort: option.value,
                page: 1,
              })}
              className={`shrink-0 rounded-full px-3 py-1 text-[11px] transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "border border-border text-foreground/75 hover:border-primary"
              }`}
            >
              {option.label}
            </Link>
          );
        })}
      </div>
      <span className="num ms-auto shrink-0 text-[11px] text-muted-foreground">
        {toFa(count)} کالا
      </span>
    </div>
  );
}
