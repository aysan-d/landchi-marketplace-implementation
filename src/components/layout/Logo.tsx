import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex shrink-0 items-center gap-1.5 ${className}`} aria-label="لندچی">
      <span className="flex flex-col items-center leading-[0.95] text-primary">
        <span className="text-[15px] font-black tracking-tight">لنــد</span>
        <span className="text-[15px] font-black tracking-tight">چــی</span>
      </span>
      <span className="flex flex-col gap-[2px]" aria-hidden="true">
        <span className="block size-0 border-y-[7px] border-y-transparent border-r-[11px] border-r-primary/45" />
        <span className="block size-0 border-y-[7px] border-y-transparent border-r-[11px] border-r-primary/70" />
        <span className="block size-0 border-y-[7px] border-y-transparent border-r-[11px] border-r-primary" />
      </span>
    </Link>
  );
}
