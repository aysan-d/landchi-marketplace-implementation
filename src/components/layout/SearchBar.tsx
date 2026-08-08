import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Search, ChevronDown, Menu, Loader2 } from "lucide-react";
import { categoriesQuery, productsQuery } from "@/lib/catalog";
import { faNumber, finalPrice } from "@/lib/format";

const RECENT_KEY = "landchi:recent-searches";

export function SearchBar() {
  const navigate = useNavigate();
  const [term, setTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [open, setOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(term.trim()), 350);
    return () => clearTimeout(id);
  }, [term]);

  useEffect(() => {
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"));
    } catch {
      setRecent([]);
    }
  }, []);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (!boxRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const { data: categories = [] } = useQuery(categoriesQuery());
  const { data: results, isFetching } = useQuery({
    ...productsQuery({ search: debounced, pageSize: 5 }),
    enabled: debounced.length > 1,
  });

  const categoryMatches = debounced
    ? categories.filter((c) => c.name.includes(debounced)).slice(0, 3)
    : [];

  function submit(value: string) {
    const q = value.trim();
    if (!q) return;
    const next = [q, ...recent.filter((r) => r !== q)].slice(0, 5);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    setOpen(false);
    navigate({ to: "/search", search: { q, sort: "relevant", page: 1 } });
  }

  return (
    <div ref={boxRef} className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(term);
        }}
        className="flex h-11 w-full items-center gap-1 rounded-xl bg-surface px-1.5"
      >
        <button
          type="button"
          className="hidden h-8 shrink-0 items-center gap-1.5 rounded-lg bg-background px-3 text-xs text-muted-foreground shadow-card md:flex"
        >
          <Menu className="size-4" strokeWidth={1.6} />
          همه دسته بندی ها
          <ChevronDown className="size-3.5" strokeWidth={1.6} />
        </button>
        <input
          value={term}
          onChange={(e) => {
            setTerm(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder="جستجو محصول"
          aria-label="جستجو محصول"
          className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          aria-label="جستجو"
          className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          {isFetching ? (
            <Loader2 className="size-4 animate-spin" strokeWidth={2} />
          ) : (
            <Search className="size-4" strokeWidth={2} />
          )}
        </button>
      </form>

      {open && (debounced.length > 1 || recent.length > 0) && (
        <div className="absolute inset-x-0 top-12 z-50 overflow-hidden rounded-xl border border-border bg-popover shadow-pop">
          {debounced.length > 1 ? (
            <div className="max-h-[380px] overflow-auto p-2">
              {categoryMatches.length > 0 && (
                <div className="mb-1">
                  <p className="px-2 py-1 text-[11px] text-muted-foreground">دسته‌بندی‌ها</p>
                  {categoryMatches.map((c) => (
                    <Link
                      key={c.id}
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-2 py-1.5 text-sm hover:bg-surface"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              )}
              <p className="px-2 py-1 text-[11px] text-muted-foreground">محصولات</p>
              {results?.items.length ? (
                results.items.map((p) => (
                  <Link
                    key={p.id}
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg p-2 hover:bg-surface"
                  >
                    <img
                      src={p.image_url ?? ""}
                      alt={p.name}
                      loading="lazy"
                      className="size-10 shrink-0 rounded-md object-contain"
                    />
                    <span className="line-clamp-1 min-w-0 flex-1 text-xs">{p.name}</span>
                    <span className="num shrink-0 text-[11px] text-muted-foreground">
                      {faNumber(finalPrice(p.price, p.discount_percent))} تومان
                    </span>
                  </Link>
                ))
              ) : (
                <p className="p-3 text-center text-xs text-muted-foreground">محصولی پیدا نشد.</p>
              )}
            </div>
          ) : (
            <div className="p-2">
              <p className="px-2 py-1 text-[11px] text-muted-foreground">جستجوهای اخیر</p>
              {recent.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => submit(r)}
                  className="block w-full rounded-lg px-2 py-1.5 text-start text-sm hover:bg-surface"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
