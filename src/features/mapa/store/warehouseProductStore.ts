// src/store/useTransporteStore.ts

import { create } from "zustand";
import { WarehouseProductItem } from "../types/product-types";

interface WarehouseProductStore {
  dataWarehouseProduct: WarehouseProductItem[];
  setDataWarehouseProduct: (dataWarehouseProduct: WarehouseProductItem[]) => void;
  clearDataWarehouseProduct: () => void;
}

export const useWarehouseProductStore = create<WarehouseProductStore>((set) => ({
  dataWarehouseProduct: [],
  setDataWarehouseProduct: (dataWarehouseProduct) => set({ dataWarehouseProduct }),
  clearDataWarehouseProduct: () => set({ dataWarehouseProduct: [] }),
}));
