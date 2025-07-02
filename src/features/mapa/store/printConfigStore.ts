import { create } from "zustand"
import { persist } from "zustand/middleware"

// Types
export type GroupingType = "customerCode" | "transport"
export type SheetConfig = "same" | "separate" | "both"

export type Group = {
  id: string
  name: string
  items: string[]
}

// Store Interface
interface State {
  groupingType: GroupingType
  segregatedClients: string[]
  transportGroups: Group[]
  clientGroups: Group[]
  
  // Percentage configurations
  minPercentage: string
  maxPercentage: string
  
  // Pallet break configurations
  palletBreak: boolean
  breakPercentage: number
  
  // Sheet configurations
  fullPallets: SheetConfig
  units: SheetConfig
  showDateRange: boolean
  convertBoxesToPallet: boolean
  segregateProductFIFO: boolean
  fifoRanges: string[]
  showFaixa: boolean
}

interface Actions {
  // Grouping actions
  setGroupingType: (type: GroupingType) => void
  
  // Segregated clients actions
  addClient: (client: string) => void
  removeClient: (client: string) => void
  setSegregatedClients: (clients: string[]) => void
  
  // Transport group actions
  addTransportGroup: (name: string) => void
  removeTransportGroup: (id: string) => void
  addTransportToGroup: (groupId: string, transport: string) => void
  removeTransportFromGroup: (groupId: string, transport: string) => void
  setTransportGroups: (groups: Group[]) => void
  
  // Client group actions
  addClientGroup: (name: string) => void
  removeClientGroup: (id: string) => void
  addClientToGroup: (groupId: string, client: string) => void
  removeClientFromGroup: (groupId: string, client: string) => void
  setClientGroups: (groups: Group[]) => void
  
  // Percentage actions
  setMinPercentage: (percentage: string) => void
  setMaxPercentage: (percentage: string) => void
  
  // Pallet break actions
  setPalletBreak: (active: boolean) => void
  setBreakPercentage: (percentage: number) => void
  
  // Sheet configuration actions
  setFullPallets: (config: SheetConfig) => void
  setUnits: (config: SheetConfig) => void
  setShowDateRange: (show: boolean) => void
  setConvertBoxesToPallet: (convert: boolean) => void
  setSegregateProductFIFO: (segregate: boolean) => void
  setFifoRanges: (ranges: string[]) => void
  addFifoRange: (range: string) => void
  removeFifoRange: (range: string) => void
  setShowFaixa: (show: boolean) => void
  // Reset actions
  reset: () => void
}

const initialState: State = {
  groupingType: "transport",
  segregatedClients: [],
  transportGroups: [],
  clientGroups: [],
  minPercentage: "",
  maxPercentage: "",
  palletBreak: false,
  breakPercentage: 80,
  fullPallets: "separate",
  units: "same",
  showDateRange: false,
  convertBoxesToPallet: true,
  segregateProductFIFO: false,
  fifoRanges: [],
  showFaixa: true
}

// Store
export const usePrintConfigStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Grouping actions
      setGroupingType: (type) => set({ groupingType: type }),

      // Segregated clients actions
      addClient: (client) => {
        const { segregatedClients } = get()
        if (!segregatedClients.includes(client)) {
          set({ segregatedClients: [...segregatedClients, client] })
        }
      },
      
      removeClient: (client) => {
        const { segregatedClients } = get()
        set({ segregatedClients: segregatedClients.filter(c => c !== client) })
      },
      
      setSegregatedClients: (clients) => set({ segregatedClients: clients }),

      // Transport group actions
      addTransportGroup: (name) => {
        set({ 
          transportGroups: [...get().transportGroups, { 
            id: Date.now().toString(), 
            name, 
            items: [] 
          }] 
        })
      },
      
      removeTransportGroup: (id) => {
        set({ transportGroups: get().transportGroups.filter(g => g.id !== id) })
      },
      
      addTransportToGroup: (groupId, transport) => {
        set({
          transportGroups: get().transportGroups.map(g => 
            g.id === groupId ? { ...g, items: [...g.items, transport] } : g
          )
        })
      },
      
      removeTransportFromGroup: (groupId, transport) => {
        set({
          transportGroups: get().transportGroups.map(g => 
            g.id === groupId ? { ...g, items: g.items.filter(t => t !== transport) } : g
          )
        })
      },
      
      setTransportGroups: (groups) => set({ transportGroups: groups }),

      // Client group actions
      addClientGroup: (name) => {
        set({ 
          clientGroups: [...get().clientGroups, { 
            id: Date.now().toString(), 
            name, 
            items: [] 
          }] 
        })
      },
      
      removeClientGroup: (id) => {
        set({ clientGroups: get().clientGroups.filter(g => g.id !== id) })
      },
      
      addClientToGroup: (groupId, client) => {
        set({
          clientGroups: get().clientGroups.map(g => 
            g.id === groupId ? { ...g, items: [...g.items, client] } : g
          )
        })
      },
      
      removeClientFromGroup: (groupId, client) => {
        set({
          clientGroups: get().clientGroups.map(g => 
            g.id === groupId ? { ...g, items: g.items.filter(c => c !== client) } : g
          )
        })
      },
      
      setClientGroups: (groups) => set({ clientGroups: groups }),

      // Percentage actions
      setMinPercentage: (percentage) => set({ minPercentage: percentage }),
      setMaxPercentage: (percentage) => set({ maxPercentage: percentage }),

      // Pallet break actions
      setPalletBreak: (active) => set({ palletBreak: active }),
      setBreakPercentage: (percentage) => set({ breakPercentage: percentage }),

      // Sheet configuration actions
      setFullPallets: (config) => set({ fullPallets: config }),
      setUnits: (config) => set({ units: config }),
      setShowDateRange: (show) => set({ showDateRange: show }),
      setConvertBoxesToPallet: (convert) => set({ convertBoxesToPallet: convert }),
      setSegregateProductFIFO: (segregate) => set({ segregateProductFIFO: segregate }),
      setFifoRanges: (ranges) => set({ fifoRanges: ranges }),
      addFifoRange: (range) => set({ fifoRanges: [...get().fifoRanges, range] }),
      removeFifoRange: (range) => set({ fifoRanges: get().fifoRanges.filter(f => f !== range) }),
      setShowFaixa: (show) => set({ showFaixa: show }),
      // Reset actions
      reset: () => set(initialState),
    }),
    {
      name: "print-config-storage", // Nome da chave no localStorage
      partialize: (state) => ({
        // Salva apenas as configurações que devem persistir
        groupingType: state.groupingType,
        minPercentage: state.minPercentage,
        maxPercentage: state.maxPercentage,
        palletBreak: state.palletBreak,
        breakPercentage: state.breakPercentage,
        fullPallets: state.fullPallets,
        units: state.units,
        showDateRange: state.showDateRange,
        convertBoxesToPallet: state.convertBoxesToPallet,
        segregateProductFIFO: state.segregateProductFIFO,
        fifoRanges: state.fifoRanges,
        // NÃO salva: segregatedClients, transportGroups, clientGroups
      }),
    }
  )
) 