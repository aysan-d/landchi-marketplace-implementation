import type { ReactNode } from "react";
import { PackageSearch, AlertTriangle } from "lucide-react";

export function LoadingState({ rows = 6 }: { rows?: number }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="rounded-xl border border-border bg-card p-3">
          <div className="mb-3 aspect-square animate-pulse rounded-lg bg-surface" />
          <div className="mb-2 h-3 w-3/4 animate-pulse rounded bg-surface" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-surface" />
        </div>
      ))}
    </div>
  );
}

export function EmptyState({
  title = "محصولی پیدا نشد.",
  description,
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-border bg-card px-6 py-14 text-center">
      <PackageSearch className="mb-3 size-9 text-muted-foreground" strokeWidth={1.3} />
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="grid place-items-center rounded-xl border border-border bg-card px-6 py-14 text-center">
      <AlertTriangle className="mb-3 size-9 text-sale" strokeWidth={1.3} />
      <p className="text-sm font-medium">متأسفانه مشکلی پیش آمده. لطفاً دوباره تلاش کنید.</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-primary px-4 py-2 text-xs text-primary-foreground transition-colors hover:bg-primary-dark"
        >
          تلاش دوباره
        </button>
      )}
    </div>
  );
}
