import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Column {
  key: string;
  label: string;
  visible: boolean;
}

export const allColumns: Column[] = [
  { key: "code", label: "Código", visible: true },
  { key: "description", label: "Descrição", visible: true },
  { key: "batch", label: "Lote", visible: true },
  { key: "manufacturingDate", label: "Data Fab.", visible: true },
  { key: "dataMinima", label: "Dt. Mínima", visible: false },
  { key: "dataMaxima", label: "Dt Máxima", visible: false },
  { key: "quantityPallets", label: "Pallet", visible: true },
  { key: "quantityBoxes", label: "Caixas", visible: true },
  { key: "quantityUnits", label: "Und.", visible: true },
  { key: "address", label: "Endereço", visible: true },
];

const defaultColumns = allColumns.filter(col => col.visible).map(col => col.key);

interface ColumnConfigState {
  selectedColumns: string[];
  columnOrder: string[]; // Nova propriedade para ordem das colunas
  setSelectedColumns: (cols: string[]) => void;
  setColumnOrder: (order: string[]) => void; // Nova action para definir ordem
  resetColumns: () => void;
  toggleColumnVisibility: (columnKey: string) => void;
  setColumnVisibility: (columnKey: string, visible: boolean) => void;
}

export const useColumnConfigStore = create<ColumnConfigState>()(
  persist(
    (set, get) => ({
      selectedColumns: defaultColumns,
      columnOrder: allColumns.map(col => col.key), // Ordem inicial baseada em allColumns
      setSelectedColumns: (cols) => set({ selectedColumns: cols }),
      setColumnOrder: (order) => set({ columnOrder: order }),
      resetColumns: () => set({ 
        selectedColumns: defaultColumns,
        columnOrder: allColumns.map(col => col.key)
      }),
      toggleColumnVisibility: (columnKey) => {
        const column = allColumns.find(col => col.key === columnKey);
        if (column) {
          column.visible = !column.visible;
          const visibleColumns = allColumns.filter(col => col.visible).map(col => col.key);
          set({ selectedColumns: visibleColumns });
        }
      },
      setColumnVisibility: (columnKey, visible) => {
        const column = allColumns.find(col => col.key === columnKey);
        if (column) {
          column.visible = visible;
          const visibleColumns = allColumns.filter(col => col.visible).map(col => col.key);
          set({ selectedColumns: visibleColumns });
        }
      },
    }),
    {
      name: "column-config-storage", // Nome da chave no localStorage
      partialize: (state) => ({ 
        selectedColumns: state.selectedColumns,
        columnOrder: state.columnOrder // Salva também a ordem das colunas
      }),
    }
  )
); 