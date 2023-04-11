import { create } from 'zustand';

import { Product } from '@/features/Product';

type ShoppingCartState = {
  items: (Product & { quantity: number })[];
  totalQuantity: number;
  totalPrice: number;
};

export const useShoppingCartStore = create<ShoppingCartState>((set) => ({
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
}));
