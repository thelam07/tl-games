import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@shared/types';

interface CartState {
  items: CartItem[];
  add: (product: Product, quantity?: number) => void;
  remove: (productId: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  clear: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

// persist: tu dong luu vao localStorage -> F5 xong gio hang van con
export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (product, quantity = 1) =>
        set((state) => {
          const found = state.items.find((i) => i.product.id === product.id);
          if (found) {
            // da co trong gio -> cong don, nhung khong vuot qua ton kho
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        }),

      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),

      setQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.product.id === productId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0), // giam ve 0 thi bo khoi gio
        })),

      clear: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'tltech-cart' },
  ),
);
