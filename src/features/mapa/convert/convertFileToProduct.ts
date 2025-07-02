import { processExcelFile } from "../uploadFile";
import { WarehouseProductItem } from "../types/product-types";
import { parseNumberBr } from "@/features/utils/parseNumber";

export async function convertFileToProduct(file: File): Promise<WarehouseProductItem[]> {
  const data: any[] = await processExcelFile(file) as any[];
  const convertedData = data.map((item: any) => ({
    skuCode: String(item["Cod_SKU"] ?? "").trim(),
    skuDescription: String(item["Descricao_SKU"] ?? "").trim(),
    shelf: parseInt(item["Shelf_Life"]) || 0,
    weightType: parseInt(item["Tipo_Peso"]) || 0,
    boxWeight: parseNumberBr(item["Peso_Liq(cx)"]),
    unitsPerBox: parseInt(item["Un_Cx"]) || 0,
    boxesPerPallet: parseInt(item["Cx_Pallet"]) || 0,
    line: String(item["Linha"] ?? "").trim(),
    redRange: parseNumberBr(item["Vermelho"]),
    orangeRange: parseNumberBr(item["Laranja"]),
    yellowRange: parseNumberBr(item["Amarelo"]),
    greenRange: parseNumberBr(item["Verde"]),
    pickWay: parseInt(item["PickWay"]) || 0,
    address: String(item["Endereço"] ?? "").trim(),
    empresa: String(item["Empresa"] ?? "").trim(),
  }))

  return convertedData;
}
