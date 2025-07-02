import { processExcelFile } from "../uploadFile";
import { ShipmentItem } from "../types/shipment-type";

export async function convertFileToShipment(file: File): Promise<ShipmentItem[]> {
  const data: any[] = await processExcelFile(file) as any[];
  
  const convertedData = data.map((item: any) => ({
    transport: String(item["Nº transporte(DT)"] ?? "").trim().replace(/^0+/, ""),
    shipment: String(item["Remessa"] ?? "").trim(),
    shipmentItem: String(item["Nº item remessa"] ?? "").trim(),
    center: String(item["Centro"] ?? "").trim(),
    company: String(item["Empresa"] ?? "").trim(),
    companyName: String(item["Nome Empresa"] ?? "").trim(),
    licensePlate: String(item["Placa"] ?? "").trim(),
    skuCode: String(item["Cód. Item"] ?? "").trim(),
    skuDescription: String(item["Descrição do produto"] ?? "").trim(),
    batch: String(item["Lote"] ?? "").trim(),
    sale: parseFloat(item["Total(Unid.Vda.)"]) || 0,
    averageUnit: String(item["Unid.Armaz."] ?? "").trim(),
    manufacturingDate: new Date(item["Dt.Fabricação"]),
    expirationDate: new Date(item["Dt.Vencimento"]),
    customerCode: String(item["Cód. Cliente"] ?? "").trim().replace(/^0+/, ""),
    customerName: String(item["Nome Cliente"] ?? "").trim(),
    grossWeight: parseFloat(item["Peso Bruto"]) || 0,
    netWeight: parseFloat(item["Peso Líquido"]) || 0,
  }));

  return convertedData;
}
