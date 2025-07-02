import { RoutingItem } from "../types/routing-type";
import { processExcelFile } from "../uploadFile";

export async function convertFileToRouting(file: File): Promise<RoutingItem[]> {
  const data: any[] = await processExcelFile(file) as any[];
  
  const convertedData = data.map((item: any) => ({
    company: String(item["Empresa"] ?? "").trim(),
    route: String(item["Rota Gerada no Roteirizador"] ?? "").trim(),
    transport: String(item["Nº transporte"] ?? "").trim(),
    licensePlate: String(item["Identif.externo 1"] ?? "").trim(),
    shipment: String(item["Fornecimento"] ?? "").trim(),
    sequence: parseInt(item["Seqüência"]) || 0,
    customer: String(item["Cliente"] ?? "").trim().replace(/^0+/, ""),
    customerName: String(item["Nome"] ?? "").trim(),
    location: String(item["Local"] ?? "").trim(),
    routedVehicle: String(item["Veículo Roteirizado"] ?? "").trim(),
    effectiveVehicle: String(item["Veículo Efetivo"] ?? "").trim(),
    carrier: String(item["Nome do Transportador"] ?? "").trim(),
    cargoType: String(item["Tipo de Carga"] ?? "").trim(),
  }));

  return convertedData;
}
