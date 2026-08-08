import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/layout/AppShell";
import { categoriesQuery } from "@/lib/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "دسته‌بندی کالاها | لندچی" },
      {
        name: "description",
        content: "همه دسته‌بندی‌های فروشگاه لندچی؛ کالای دیجیتال، لوازم خانگی، مد و پوشاک و بیشتر.",
      },
      { property: "og:title", content: "دسته‌بندی کالاها | لندچی" },
      { property: "og:description", content: "مرور دسته‌بندی‌های فروشگاه اینترنتی لندچی." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { data: categories = [], isLoading } = useQuery(categoriesQuery());
  const roots = categories.filter((c) => !c.parent_id);

  return (
    <AppShell>
      <div className="container-landchi py-6">
        <h1 className="mb-4 text-lg font-bold">دسته‌بندی کالاها</h1>
        {isLoading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-xl bg-card" />
            ))}
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {roots.map((root) => {
              const children = categories.filter((c) => c.parent_id === root.id);
              return (
                <div key={root.id} className="rounded-xl border border-border bg-card p-4">
                  <Link
                    to="/category/$slug"
                    params={{ slug: root.slug }}
                    className="flex items-center gap-2 text-sm font-bold hover:text-primary"
                  >
                    <span
                      className="grid size-9 place-items-center rounded-lg text-xs"
                      style={{ backgroundColor: root.color ?? "var(--surface)" }}
                    >
                      {root.name.slice(0, 1)}
                    </span>
                    {root.name}
                  </Link>
                  <ul className="mt-3 space-y-1.5">
                    {children.map((child) => (
                      <li key={child.id}>
                        <Link
                          to="/category/$slug"
                          params={{ slug: child.slug }}
                          className="text-[11px] text-muted-foreground hover:text-primary"
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
