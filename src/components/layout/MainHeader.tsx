import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, ShoppingCart, User, Gift, LayoutGrid, HandCoins, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { categoriesQuery } from "@/lib/catalog";

const actions = [
  { label: "تسهیلات", icon: HandCoins, to: "/installments/calculator" as const },
  { label: "پشتیبانی", icon: Gift, to: "/support" as const },
  { label: "پیشنهاد", icon: LayoutGrid, to: "/search" as const },
];

export function MainHeader() {
  const { data: categories = [] } = useQuery(categoriesQuery());

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="container-landchi flex h-16 items-center gap-3 lg:gap-6">
        <Logo />

        <div className="min-w-0 flex-1 lg:max-w-[520px]">
          <SearchBar />
        </div>

        <nav className="hidden items-center gap-5 lg:flex">
          {actions.map(({ label, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-1.5 text-xs text-foreground/80 transition-colors hover:text-primary"
            >
              <Icon className="size-5 text-primary" strokeWidth={1.4} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-2">
          <Link
            to="/account/wishlist"
            aria-label="علاقه‌مندی‌ها"
            className="hidden size-9 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-accent sm:grid"
          >
            <Heart className="size-4.5" strokeWidth={1.5} />
          </Link>
          <Link
            to="/account"
            aria-label="حساب کاربری"
            className="grid size-9 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-accent"
          >
            <User className="size-4.5" strokeWidth={1.5} />
          </Link>
          <Link
            to="/cart"
            aria-label="سبد خرید"
            className="grid size-9 place-items-center rounded-full border border-border text-primary transition-colors hover:bg-accent"
          >
            <ShoppingCart className="size-4.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="container-landchi no-scrollbar flex h-10 items-center gap-4 overflow-x-auto text-xs">
          <span className="flex shrink-0 items-center gap-1 font-medium text-primary">
            دسته‌بندی‌ها
            <ChevronDown className="size-3.5" strokeWidth={1.6} />
          </span>
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="shrink-0 whitespace-nowrap text-foreground/75 transition-colors hover:text-primary"
              activeProps={{ className: "text-primary font-medium" }}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
