import { Link } from "@tanstack/react-router";
import { MapPin, ChevronDown, LogIn, Headset } from "lucide-react";
import { toFa } from "@/lib/format";

export function TopBar() {
  return (
    <div className="bg-primary text-primary-foreground">
      <div className="container-landchi flex h-9 items-center justify-between gap-3 text-[11px] sm:text-xs">
        <div className="flex min-w-0 items-center gap-1.5">
          <Headset className="size-3.5 shrink-0 opacity-80" strokeWidth={1.6} />
          <span className="num truncate opacity-90">{toFa("+98 123456")}</span>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="flex items-center gap-1 rounded-md border border-primary-foreground/25 px-2 py-1 transition-colors hover:bg-primary-foreground/10"
          >
            <MapPin className="size-3.5" strokeWidth={1.6} />
            <span>تهران</span>
            <ChevronDown className="size-3" strokeWidth={1.6} />
          </button>
          <Link
            to="/login"
            className="hidden items-center gap-1 opacity-90 transition-opacity hover:opacity-100 sm:flex"
          >
            <span>ورود | ثبت نام</span>
            <LogIn className="size-3.5" strokeWidth={1.6} />
          </Link>
        </div>
      </div>
    </div>
  );
}
