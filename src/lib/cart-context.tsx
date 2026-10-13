"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getProduct, type Product } from "./products";

const STORAGE_KEY = "mockmart:cart:v1";

type CartMap = Record<string, number>;

export interface CartLine {
  product: Product;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  qtyOf: (slug: string) => number;
  addItem: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  toast: string | null;
  // True once the cart has finished loading from localStorage. Anything that
  // needs to clear() the cart on mount (e.g. the order confirmation page)
  // must wait for this — otherwise the hydration read below can fire after
  // the clear and silently restore the pre-checkout cart from storage.
  hydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartMap>({});
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load any previously saved cart once, on mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {
      // ignore corrupt/blocked storage
    }
    setHydrated(true);
  }, []);

  // Persist on every change, once we know we're not about to clobber storage
  // with the pre-hydration empty state.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, hydrated]);

  const flashToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const addItem = useCallback(
    (slug: string, qty = 1) => {
      const product = getProduct(slug);
      if (!product) return;
      setCart((prev) => ({ ...prev, [slug]: (prev[slug] || 0) + qty }));
      flashToast(`Added ${product.name} to cart`);
    },
    [flashToast]
  );

  const setQty = useCallback((slug: string, qty: number) => {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[slug];
        return next;
      }
      return { ...prev, [slug]: qty };
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[slug];
      return next;
    });
  }, []);

  const clear = useCallback(() => setCart({}), []);

  const lines = useMemo<CartLine[]>(() => {
    return Object.entries(cart)
      .map(([slug, qty]) => {
        const product = getProduct(slug);
        return product && qty > 0 ? { product, qty } : null;
      })
      .filter((line): line is CartLine => line !== null);
  }, [cart]);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty * l.product.price, 0),
    [lines]
  );
  const qtyOf = useCallback((slug: string) => cart[slug] || 0, [cart]);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    qtyOf,
    addItem,
    setQty,
    removeItem,
    clear,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    toggleCart: () => setIsOpen((v) => !v),
    toast,
    hydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
