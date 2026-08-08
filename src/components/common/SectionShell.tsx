import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

export function SectionShell({
  title,
  href,
  children,
  tone = "plain",
  extra,
}: {
  title: string;
  href?: string;
  children: ReactNode;
  tone?: "plain" | "plum";
  extra?: ReactNode;
}) {
  const plum = tone === "plum";
  return (
    <section className={plum ? "bg-primary py-6" : "py-6"}>
      <div className="container-landchi">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className={`section-title ${plum ? "text-primary-foreground" : ""}`}>{title}</h2>
          <div className="flex items-center gap-3">
            {extra}
            {href && (
              <Link
                to={href}
                className={`flex items-center gap-0.5 text-[11px] ${
                  plum ? "text-primary-foreground/90" : "text-muted-foreground hover:text-primary"
                }`}
              >
                مشاهده همه
                <ChevronLeft className="size-3.5" strokeWidth={1.6} />
              </Link>
            )}
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}
