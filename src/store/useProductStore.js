import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { products } from '../data/products.js';

export const useProductStore = create(
  persist(
    (set, get) => ({
      items: [],

      onFetchItem: () => {
        if ((get().items || []).length === 0) {
          set({ items: products });
        }
      },

      onItemsCategory: (cate) => {
        const allItems = get().items || [];

        if (!cate || cate === 'all') {
          return allItems;
        } else {
          const lowerCaseCate = cate.toLowerCase();

          return allItems.filter((item) => {
            return item.category.toLowerCase().includes(lowerCaseCate);
          });
        }
      },

      onItemsBrand: (brand) => {
        const allItems = get().items || [];

        if (!brand || brand === 'all') {
          return allItems;
        } else if (Array.isArray(brand)) {
          return allItems.filter((item) => {
            if (item.brand && typeof item.brand === 'string') {
              return brand.includes(item.brand);
            }
            return false;
          });
        } else {
          return allItems.filter((item) => item.brand === brand);
        }
      },

      onFetchRatedItems: (cate, rating = 5, start = 10, count = 5) => {
        const allItems = get().onItemsCategory(cate);
        const ratedItems = allItems.filter((item) => item.rating === rating);
        const startIndex = start > 0 ? start - 1 : 0;
        const endIndex = startIndex + count;
        return ratedItems.slice(startIndex, endIndex);
      },
    }),
    {
      name: 'product-storage',
    }
  )
);
