import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toFa } from "@/lib/format";
import type { SortValue } from "@/lib/catalog";

export function Pagination({
  page,
  pageCount,
  to,
  params,
  sort,
}: {
  page: number;
  pageCount: number;
  to: "/category/$slug" | "/search";
  params?: { slug: string };
  sort: SortValue;
}) {
  if (pageCount <= 1) return null;

  const pages = new Set<number>([1, pageCount, page, page - 1, page + 1]);
  const list = [...pages].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);

  const linkProps = (target: number) => ({
    to,
    ...(params ? { params } : {}),
    search: (prev: Record<string, unknown>) => ({ ...prev, page: target, sort }),
  });

  return (
    <nav className="mt-6 flex items-center justify-center gap-1.5">
      <Link
        {...linkProps(Math.max(1, page - 1))}
        className="grid size-8 place-items-center rounded-lg border border-border"
        aria-label="صفحه قبل"
      >
        <ChevronRight className="size-4" strokeWidth={1.6} />
      </Link>
      {list.map((p, index) => (
        <span key={p} className="flex items-center gap-1.5">
          {index > 0 && p - (list[index - 1] ?? 0) > 1 && (
            <span className="text-xs text-muted-foreground">...</span>
          )}
          <Link
            {...linkProps(p)}
            className={`num grid size-8 place-items-center rounded-lg text-xs ${
              p === page
                ? "bg-primary text-primary-foreground"
                : "border border-border hover:border-primary"
            }`}
          >
            {toFa(p)}
          </Link>
        </span>
      ))}
      <Link
        {...linkProps(Math.min(pageCount, page + 1))}
        className="grid size-8 place-items-center rounded-lg border border-border"
        aria-label="صفحه بعد"
      >
        <ChevronLeft className="size-4" strokeWidth={1.6} />
      </Link>
    </nav>
  );
}
