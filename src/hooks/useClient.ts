import { create } from 'zustand';

type navigatorTAB = {
  navigatorTab: string;
  setNavigatorTab: (navigatorTab: string) => void;
}

export const useNavigator = create<navigatorTAB>((set) => ({
  navigatorTab: 'follow',
  setNavigatorTab: (navigatorTab) => set({ navigatorTab })
}));