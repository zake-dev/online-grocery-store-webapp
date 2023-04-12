import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product } from '@/features/Product';

type ShoppingCartStore = {
  items: (Product & { quantity: number })[];
  totalQuantity: number;
  totalPrice: number;
  shouldPlaceOrder: boolean;
  addItem: (target: Product) => void;
  removeItem: (target: Product) => void;
  increaseItem: (target: Product) => void;
  decreaseItem: (target: Product) => void;
  clearItems: () => void;
  checkout: () => void;
  placeOrder: () => void;
};

export const useShoppingCartStore = create<ShoppingCartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      shouldPlaceOrder: false,
      addItem: (target: Product) => {
        const { items, totalQuantity, totalPrice } = get();

        let item = items.find((item) => item.id === target.id);
        if (!item) {
          item = { ...target, quantity: 0 };
          items.push(item);
        }
        const newQuantity = Math.min(item.quantity + 1, 20, item.inStock);
        const newTotalQuantity =
          item.quantity === newQuantity ? totalQuantity : totalQuantity + 1;
        const newTotalPrice =
          item.quantity === newQuantity
            ? totalPrice
            : totalPrice + target.price;
        item.quantity = newQuantity;

        set({
          items: [...items],
          totalQuantity: newTotalQuantity,
          totalPrice: newTotalPrice,
        });
      },
      removeItem: (target: Product) => {
        const { items, totalQuantity, totalPrice } = get();
        const item = items.find((item) => item.id === target.id) ?? {
          ...target,
          quantity: 0,
        };
        const newItems = items.filter((item) => item.id !== target.id);
        set({
          items: newItems,
          totalQuantity: totalQuantity - item.quantity,
          totalPrice: Math.abs(totalPrice - item.price * item.quantity),
        });
      },
      increaseItem: (target: Product) => get().addItem(target),
      decreaseItem: (target: Product) => {
        const { items, totalQuantity, totalPrice, removeItem } = get();
        const item = items.find((item) => item.id === target.id);
        if (!item) return;
        if (item.quantity === 1) return removeItem(target);
        item.quantity--;
        set({
          items,
          totalQuantity: totalQuantity - 1,
          totalPrice: totalPrice - target.price,
        });
      },
      clearItems: () => set({ items: [], totalQuantity: 0, totalPrice: 0 }),
      checkout: () => set({ shouldPlaceOrder: true }),
      placeOrder: () =>
        set({
          shouldPlaceOrder: false,
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
        }),
    }),
    { name: 'shopping-cart-store' },
  ),
);
