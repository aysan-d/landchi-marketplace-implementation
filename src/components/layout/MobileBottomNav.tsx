import { Link } from "@tanstack/react-router";
import { Home, LayoutGrid, Search, ShoppingCart, User } from "lucide-react";

const items = [
  { label: "خانه", icon: Home, to: "/" as const },
  { label: "دسته‌بندی", icon: LayoutGrid, to: "/categories" as const },
  { label: "جستجو", icon: Search, to: "/search" as const },
  { label: "سبد خرید", icon: ShoppingCart, to: "/cart" as const },
  { label: "حساب", icon: User, to: "/account" as const },
];

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background lg:hidden">
      <ul className="grid grid-cols-5">
        {items.map(({ label, icon: Icon, to }) => (
          <li key={label}>
            <Link
              to={to}
              className="flex flex-col items-center gap-1 py-2 text-[10px] text-muted-foreground"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: to === "/" }}
            >
              <Icon className="size-5" strokeWidth={1.5} />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
