import _ from "lodash";
import { usePrintConfigStore } from "../store/printConfigStore";
import { EnrichedShipmentItem } from "./enrichedData";

type Props = {
  enrichedData: EnrichedShipmentItem[];
  isFifo?: boolean;
  fifoRanges?: string[];
}

export const groupedData = ({ enrichedData, isFifo, fifoRanges }: Props) => _.groupBy(enrichedData, (item: any) => {
  const { groupingType, clientGroups, transportGroups, segregatedClients } = usePrintConfigStore();

  //Agrupa por transporte
  if (groupingType === 'transport') {
    //Agrupa por transporte e transportes agrupados
    if (transportGroups.length > 0) {
      if(isFifo){
        if (transportGroups.find(group => group.items.includes(item?.transport)) && fifoRanges?.includes(item?.faixaProduto?.faixa)) {
          return `FIFO - ${transportGroups.find(group => group.items.includes(item?.transport))?.name} - ${transportGroups.map(group => group.items).join(", ")} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
        }
      }
      if (transportGroups.find(group => group.items.includes(item?.transport))) {
        return `${transportGroups.find(group => group.items.includes(item?.transport))?.name} - ${transportGroups.map(group => group.items).join(", ")} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
      }
    }
    //Agrupar transporte e segrega cliente
    if (segregatedClients.length > 0) {
      if(isFifo){
        if (segregatedClients.find(client => client.includes(item?.customerCode)) && fifoRanges?.includes(item?.faixaProduto?.faixa)) {
          return `FIFO - ${segregatedClients.find(client => client.includes(item?.customerCode))} - ${item?.customerName} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
        }
      }
      if (segregatedClients.find(client => client.includes(item?.customerCode))) {
        return `${segregatedClients.find(client => client.includes(item?.customerCode))} - ${item?.customerName} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
      }
    }
    //Agrupar transporte
    if(isFifo){
      if(fifoRanges?.includes(item?.faixaProduto?.faixa)) {
        return `FIFO - ${item?.transport} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
      }
    }
    return `${item?.transport} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
  }
  //Agrupa por cliente e clientes agrupados
  if (clientGroups.length > 0) {
    if(isFifo){
      if(fifoRanges?.includes(item?.faixaProduto?.faixa)) {
        return `FIFO - ${clientGroups.find(group => group.items.includes(item?.customerCode))?.name} - ${clientGroups.map(group => group.items).join(", ")} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
      }
    }
    return `${clientGroups.find(group => group.items.includes(item?.customerCode))?.name} - ${clientGroups.map(group => group.items).join(", ")} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
  }
  //Agrupa por cliente
  if(isFifo){
    if(fifoRanges?.includes(item?.faixaProduto?.faixa)) {
      return `FIFO - ${item?.customerCode} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
    }
  }
  return `${item?.customerCode} - ${item?.warehouseProduct?.line} - ${item?.warehouseProduct?.empresa}`;
});