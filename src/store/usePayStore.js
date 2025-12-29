import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePayStore = create(
  persist(
    (set, get) => ({
      // 날짜
      today: new Date().toLocaleDateString(),

      receiverInfo: {
        displayName: '',
        phone: '',
        address: '',
        address2: '',
        request: '',
      },

      setReceiverInfo: (info) => set({ receiverInfo: info }),

      // 결제 완료된 주문 저장 배열
      orders: [],

      // orders 배열에 주문 내역 추가
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),

      // 초기화
      resetOrder: () => set({ orders: [] }),
    }),
    { name: 'order-storage' }
  )
);
