export interface SummarizedProduct {
  code: string;
  description: string;
  batch: string;
  manufacturingDate: Date;
  quantityPallets: number;
  quantityBoxes: number;
  quantityUnits: number;
  percentualPallet: number;
  pickWay: string;
  palletUsage?: number;
  address: string;
  line: string;
  empresa: string;
  boxWeight: number;
  boxesPerPallet: number;
  unitsPerBox: number;
  faixaProduto: {
    dataMinima: Date | null;
    dataMaxima: Date | null;
    faixa: string;
  };
}

export interface SummarizedGroup {
  totalItems: number;
  totalGrossWeight: number;
  totalNetWeight: number;
  totalPallets: number;
  totalBoxes: number;
  totalUnits: number;
  totalPalletWeight: number;
  totalBoxWeight: number;
  totalUnitWeight: number;
  customerInfo: { code: string; name: string };
  companyInfo: { code: string; name: string };
  line: string;
  uniqueProducts: number;
  uniqueTransports: number;
  palletNumber?: number;
  palletUsage?: number;
  transport: string;
  licensePlate?: string;
  sequence?: number;
  route?: string;
  location?: string;
  carrier?: string;
  effectiveVehicle?: string;
  products: SummarizedProduct[];
} 