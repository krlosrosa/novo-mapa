import _ from "lodash";
import { useRoutingStore } from "../store/routingStore";
import { useShipmentStore } from "../store/shipmentStore";
import { useWarehouseProductStore } from "../store/warehouseProductStore";
import { usePrintConfigStore } from "../store/printConfigStore";
import convertSaleUnits from "@/features/utils/unitConverter";
import { calcularFaixaProduto, type FaixaProduto } from "@/features/utils/calculateRange";
import type { ShipmentItem } from "../types/shipment-type";
import type { WarehouseProductItem } from "../types/product-types";
import type { RoutingItem } from "../types/routing-type";

export type EnrichedShipmentItem = ShipmentItem & {
  warehouseProduct?: WarehouseProductItem;
  routing?: RoutingItem;
  faixaProduto: FaixaProduto;
  boxes: number;
  units: number;
};

export const useEnrichedData = (): EnrichedShipmentItem[] => {
  const { dataShipment } = useShipmentStore();
  const { dataWarehouseProduct } = useWarehouseProductStore();
  const { dataRouting } = useRoutingStore();
  const { minPercentage, maxPercentage } = usePrintConfigStore();

  const enrichedData = _.map(dataShipment, shipment => {
    const warehouseProduct = _.find(dataWarehouseProduct, { skuCode: shipment.skuCode });
    const routing = _.find(dataRouting, { shipment: shipment.shipment });
    const saleUnits = convertSaleUnits(shipment.sale, shipment.averageUnit);
    
    // Calcular faixa do produto baseado na data de fabricação e shelf life
    let faixaProduto: FaixaProduto = {
      dataMinima: null,
      dataMaxima: null,
      faixa: ""
    };

    if (warehouseProduct && shipment.manufacturingDate) {
      faixaProduto = calcularFaixaProduto(
        new Date(shipment.manufacturingDate),
        warehouseProduct.shelf,
        warehouseProduct.redRange,
        warehouseProduct.orangeRange,
        warehouseProduct.yellowRange,
        warehouseProduct.greenRange,
        minPercentage,
        maxPercentage
      );
    }

    return {
      ...shipment,
      ...saleUnits,
      warehouseProduct,
      routing,
      faixaProduto
    };
  });
  console.log(enrichedData)
  return enrichedData;
}