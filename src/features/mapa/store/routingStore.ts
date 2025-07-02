// src/store/useTransporteStore.ts

import { create } from "zustand";
import { RoutingItem } from "../types/routing-type";  

interface RoutingStore {
  dataRouting: RoutingItem[];
  setDataRouting: (dataRouting: RoutingItem[]) => void;
  clearDataRouting: () => void;
}

export const useRoutingStore = create<RoutingStore>((set) => ({
  dataRouting: [],
  setDataRouting: (dataRouting) => set({ dataRouting }),
  clearDataRouting: () => set({ dataRouting: [] }),
}));
