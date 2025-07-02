import { convertUnitsToHierarchy } from './conversionUtils';
import { SummarizedProduct } from './summarizeTypes';
import _ from 'lodash';

export function groupProducts(items: any[]): SummarizedProduct[] {
  return _(items)
    .groupBy(item => `${item.skuCode}-${item.batch}-${item.manufacturingDate}`)
    .map(groupItems => {
      const totalUnits = _.sumBy(groupItems, 'units');
      const totalBoxes = _.sumBy(groupItems, 'boxes');
      const unitsPerBox = groupItems[0].warehouseProduct?.unitsPerBox || 1000000000;
      const boxesPerPallet = groupItems[0].warehouseProduct?.boxesPerPallet || 10000000;
      const converted = convertUnitsToHierarchy(totalUnits, totalBoxes, unitsPerBox, boxesPerPallet);
      const percentualPallet = (converted.boxes / boxesPerPallet) * 100;
      return {
        code: groupItems[0].skuCode,
        description: groupItems[0].skuDescription,
        batch: groupItems[0].batch,
        manufacturingDate: groupItems[0].manufacturingDate,
        quantityPallets: converted.pallets,
        quantityBoxes: converted.boxes,
        quantityUnits: converted.units,
        faixaProduto: groupItems[0].faixaProduto,
        percentualPallet,
        pickWay: groupItems[0].warehouseProduct?.pickWay,
        address: groupItems[0].warehouseProduct?.address,
        line: groupItems[0].warehouseProduct?.line || '',
        empresa: groupItems[0].warehouseProduct?.empresa || '',
        boxWeight: groupItems[0].warehouseProduct?.boxWeight ?? 0,
        boxesPerPallet: groupItems[0].warehouseProduct?.boxesPerPallet ?? 0,
        unitsPerBox: groupItems[0].warehouseProduct?.unitsPerBox ?? 1
      };
    })
    .sortBy('pickWay')
    .value();
} 