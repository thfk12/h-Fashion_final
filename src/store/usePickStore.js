import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePickStore = create(
  persist(
    (set, get) => ({
      pickLists: [],

      onAddWishList: (item) => {
        const pick = get().pickLists;

        const exisiting = pick.find((p) => p.code == item.code);

        let updatePick;
        if (exisiting) {
          updatePick = pick.filter((p) => p.code !== item.code);
          alert('찜목록에서 제거되었습니다.');
        } else {
          updatePick = [...pick, { ...item }];
          alert('찜목록에 추가되었습니다!');
        }
        set({
          pickLists: updatePick,
        });
      },

      onRemoveList: (code) => {
        const pick = get().pickLists;
        const updatePick = pick.filter((p) => !(p.code === code));
        set({
          pickLists: updatePick,
        });
      },
      isActive: null,
      setIsActive: (item) => set({ setIsActive: item }),

      resetPcikList: () => set({ pickLists: [] }),
    }),

    { name: 'pick-storage' }
  )
);
