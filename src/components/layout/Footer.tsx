import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter, Headset, Send } from "lucide-react";
import { Logo } from "./Logo";
import { toFa } from "@/lib/format";

const footerLinks = [
  { label: "وبلاگ", to: "/blog" as const },
  { label: "سوالات متداول", to: "/faq" as const },
  { label: "رهگیری سفارش", to: "/account/orders" as const },
];

export function Footer() {
  return (
    <footer className="mt-8">
      {/* app download + newsletter */}
      <div className="border-t border-border bg-background">
        <div className="container-landchi grid gap-4 py-5 md:grid-cols-2 md:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="ms-1 text-xs text-muted-foreground">دانلود اپلیکیشن لند چی</span>
            <a className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] transition-colors hover:bg-surface">
              <span className="text-success">●</span> دریافت از بازار
            </a>
            <a className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] transition-colors hover:bg-surface">
              دانلود مستقیم اندروید
            </a>
            <a className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-[11px] transition-colors hover:bg-surface">
              نسخه تحت وب
            </a>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center justify-end gap-2"
          >
            <span className="hidden text-xs text-muted-foreground sm:block">
              با ثبت ایمیل از جدید ترین تخفیف ها باخبر شوید.
            </span>
            <input
              placeholder="ایمیل شما"
              aria-label="ایمیل شما"
              className="h-9 w-40 rounded-lg border border-border bg-surface px-3 text-xs outline-none focus:border-primary"
            />
            <button className="h-9 rounded-lg bg-secondary px-4 text-xs text-secondary-foreground transition-colors hover:bg-border">
              ثبت
            </button>
          </form>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground">
        <div className="container-landchi flex flex-wrap items-center gap-4 py-4">
          <div className="rounded-lg bg-primary-foreground/95 px-2 py-1">
            <Logo />
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Headset className="size-4" strokeWidth={1.5} />
            <span className="num">تلفن پشتیبانی: {toFa("۰۲۱ - ۱۲۳۴۵۶۷۸")}</span>
          </div>
          <nav className="flex items-center gap-4 text-xs">
            {footerLinks.map((l) => (
              <Link key={l.label} to={l.to} className="opacity-90 hover:opacity-100">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ms-auto flex items-center gap-3 opacity-90">
            <Send className="size-4" strokeWidth={1.5} />
            <Facebook className="size-4" strokeWidth={1.5} />
            <Twitter className="size-4" strokeWidth={1.5} />
            <Instagram className="size-4" strokeWidth={1.5} />
          </div>
        </div>
        <div className="bg-primary-dark py-2 text-center text-[11px] opacity-90">
          کلیه حقوق این سایت متعلق به لندچی است.
        </div>
      </div>
    </footer>
  );
}
