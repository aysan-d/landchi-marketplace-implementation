import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Product } from "./catalog";

export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  image: string | null;
  unitPrice: number;
  discountPercent: number;
  stock: number;
  quantity: number;
  variantLabel?: string;
  savedForLater?: boolean;
};

type CartContextValue = {
  lines: CartLine[];
  add: (product: Product, quantity?: number, variantLabel?: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  saveForLater: (productId: string, saved: boolean) => void;
  clear: () => void;
  count: number;
};

const STORAGE_KEY = "landchi:cart";
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      setLines(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
    } catch {
      setLines([]);
    }
  }, []);

  const persist = useCallback((next: CartLine[]) => {
    setLines(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      count: lines.filter((l) => !l.savedForLater).reduce((sum, l) => sum + l.quantity, 0),
      add: (product, quantity = 1, variantLabel) => {
        const existing = lines.find((l) => l.productId === product.id);
        if (existing) {
          persist(
            lines.map((l) =>
              l.productId === product.id
                ? { ...l, quantity: Math.min(l.quantity + quantity, product.stock) }
                : l,
            ),
          );
          return;
        }
        persist([
          ...lines,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image: product.image_url,
            unitPrice: product.price,
            discountPercent: product.discount_percent,
            stock: product.stock,
            quantity: Math.min(quantity, Math.max(product.stock, 1)),
            ...(variantLabel ? { variantLabel } : {}),
          },
        ]);
      },
      setQuantity: (productId, quantity) =>
        persist(
          lines.map((l) =>
            l.productId === productId
              ? { ...l, quantity: Math.max(1, Math.min(quantity, l.stock)) }
              : l,
          ),
        ),
      remove: (productId) => persist(lines.filter((l) => l.productId !== productId)),
      saveForLater: (productId, saved) =>
        persist(
          lines.map((l) => (l.productId === productId ? { ...l, savedForLater: saved } : l)),
        ),
      clear: () => persist([]),
    }),
    [lines, persist],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
