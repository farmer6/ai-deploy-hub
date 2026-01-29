import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'subscription' | 'one-time';
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item) => {
        const currentItems = get().items;
        // 简单逻辑：如果是会员订阅，购物车里只能有一个，且不能重复添加
        if (item.type === 'subscription') {
           // 如果已经有同类商品，替换之；或者直接去重
           const exists = currentItems.find(i => i.id === item.id);
           if (exists) return; 
        }
        set({ items: [...currentItems, item] });
      },

      removeItem: (id) => set((state) => ({ 
        items: state.items.filter((i) => i.id !== id) 
      })),

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      },
    }),
    {
      name: 'ai-deploy-cart', // LocalStorage key
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);