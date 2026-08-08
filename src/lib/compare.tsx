import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

type CompareContextValue = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "landchi:compare";
const CompareContext = createContext<CompareContextValue | null>(null);
const MAX = 4;

export function CompareProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      setIds(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"));
    } catch {
      setIds([]);
    }
  }, []);

  const value = useMemo<CompareContextValue>(() => {
    const persist = (next: string[]) => {
      setIds(next);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    };
    return {
      ids,
      has: (id) => ids.includes(id),
      toggle: (id) =>
        persist(ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id].slice(-MAX)),
      clear: () => persist([]),
    };
  }, [ids]);

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside CompareProvider");
  return ctx;
}
