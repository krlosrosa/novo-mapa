import { processExcelFile } from "../uploadFile";
import { parseNumberBr } from "@/features/utils/parseNumber";

export interface ClienteSegregado {
  codCliente: string
}

export async function convertFileToClientesSegregados(file: File): Promise<ClienteSegregado[]> {
  const data: any[] = await processExcelFile(file) as any[];
  const convertedData = data.map((item: any) => {
    // Tenta diferentes possíveis nomes de coluna
    const codCliente = 
      item["Código do Cliente"] || 
      item["Código Cliente"] || 
      item["CodCliente"] || 
      item["Cliente"] || 
      item["Código"] ||
      item["Codigo"] ||
      Object.values(item)[0] // Pega o primeiro valor se não encontrar coluna específica
    
    return {
      codCliente: String(parseNumberBr(codCliente)).replace(/^0+/, "") // Remove zeros à esquerda
    }
  }).filter(cliente => cliente.codCliente && cliente.codCliente !== "") // Remove valores vazios

  return convertedData;
} 