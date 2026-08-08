import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type WishlistContextValue = {
  ids: string[];
  has: (productId: string) => boolean;
  toggle: (productId: string) => void;
  remove: (productId: string) => void;
};

const STORAGE_KEY = "landchi:wishlist";
const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      setIds(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
    } catch {
      setIds([]);
    }
  }, []);

  const value = useMemo<WishlistContextValue>(() => {
    const persist = (next: string[]) => {
      setIds(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    };
    return {
      ids,
      has: (productId) => ids.includes(productId),
      toggle: (productId) =>
        persist(ids.includes(productId) ? ids.filter((i) => i !== productId) : [...ids, productId]),
      remove: (productId) => persist(ids.filter((i) => i !== productId)),
    };
  }, [ids]);

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
