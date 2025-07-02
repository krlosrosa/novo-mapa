export interface WarehouseProductItem {
  skuCode: string;
  skuDescription: string;
  shelf: number;
  weightType: number;
  boxWeight: number;
  unitsPerBox: number;
  boxesPerPallet: number;
  line: string;
  redRange: number;
  orangeRange: number;
  yellowRange: number;
  greenRange: number;
  pickWay: number;
  address: string;
  empresa: string;
}