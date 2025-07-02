// src/store/useTransporteStore.ts

import { create } from "zustand";
import { ShipmentItem } from "../types/shipment-type";

interface ShipmentStore {
  dataShipment: ShipmentItem[];
  setDataShipment: (dataShipment: ShipmentItem[]) => void;
  clearDataShipment: () => void;
}

export const useShipmentStore = create<ShipmentStore>((set) => ({
  dataShipment: [],
  setDataShipment: (dataShipment) => set({ dataShipment }),
  clearDataShipment: () => set({ dataShipment: [] }),
}));
