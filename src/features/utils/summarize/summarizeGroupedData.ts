import { groupProducts } from './groupProducts';
import { breakIntoPallets } from './palletUtils';
import { SummarizedGroup } from './summarizeTypes';
import _ from 'lodash';

export function summarizeGroupedData(groupedData: Record<string, any[]>): Record<string, SummarizedGroup> {
  const result = _.mapValues(groupedData, (items) => {
    const productsWithConversion = groupProducts(items);
    const totalPallets = _.sumBy(productsWithConversion, 'quantityPallets');
    const totalBoxes = _.sumBy(productsWithConversion, 'quantityBoxes');
    const totalUnits = _.sumBy(productsWithConversion, 'quantityUnits');
    return {
      totalItems: items.length,
      totalGrossWeight: _.sumBy(items, 'grossWeight'),
      totalNetWeight: _.sumBy(items, 'netWeight'),
      totalPallets,
      totalBoxes,
      totalUnits,
      totalPalletWeight: _.sumBy(productsWithConversion, p => (p.quantityPallets ?? 0) * (p.boxesPerPallet ?? 0) * (p.boxWeight ?? 0)),
      totalBoxWeight: _.sumBy(productsWithConversion, p => (p.quantityBoxes ?? 0) * (p.boxWeight ?? 0)),
      totalUnitWeight: _.sumBy(productsWithConversion, p => {
        const unitsPerBox = p.unitsPerBox || 100000;
        const unitWeight = (p.boxWeight ?? 0) / unitsPerBox;
        return (p.quantityUnits ?? 0) * unitWeight;
      }),
      customerInfo: {
        code: items[0]?.customerCode,
        name: items[0]?.customerName
      },
      companyInfo: {
        code: items[0]?.warehouseProduct?.empresa || items[0]?.company || '',
        name: items[0]?.companyName || ''
      },
      line: items[0]?.warehouseProduct?.line || '',
      licensePlate: items[0]?.routing?.licensePlate || '',
      sequence: items[0]?.routing?.sequence || '',
      route: items[0]?.routing?.route || '',
      location: items[0]?.routing?.location || '',
      carrier: items[0]?.routing?.carrier || '',
      effectiveVehicle: items[0]?.routing?.effectiveVehicle || '',
      products: productsWithConversion,
      uniqueProducts: _.uniqBy(items, 'skuCode').length,
      uniqueTransports: _.uniqBy(items, 'transport').length,
      transport: items[0]?.transport || ''
    };
  });
  const sortedEntries = _.orderBy(Object.entries(result), ['1.transport', '1.customerInfo.code']);
  return Object.fromEntries(sortedEntries);
}

export function summarizeGroupedDataWithPalletBreak(
  groupedData: Record<string, any[]>,
  enablePalletBreak = false,
  palletBreakThreshold = 100
): Record<string, SummarizedGroup> {
  if (!enablePalletBreak) {
    return summarizeGroupedData(groupedData);
  }
  const result: Record<string, SummarizedGroup> = {};
  Object.entries(groupedData).forEach(([groupKey, items]) => {
    const productsWithConversion = groupProducts(items);
    const palletGroups = breakIntoPallets(productsWithConversion, items, palletBreakThreshold);
    palletGroups.forEach((palletGroup) => {
      const palletKey = `${groupKey} - Pallet: ${palletGroup.palletNumber}`;
      const totalPallets = _.sumBy(palletGroup.products, 'quantityPallets');
      const totalBoxes = _.sumBy(palletGroup.products, 'quantityBoxes');
      const totalUnits = _.sumBy(palletGroup.products, 'quantityUnits');
      const totalGrossWeight = _.sumBy(palletGroup.items, 'grossWeight') || 0;
      const totalNetWeight = _.sumBy(palletGroup.items, 'netWeight') || 0;
      result[palletKey] = {
        totalItems: palletGroup.products.length,
        totalGrossWeight,
        totalNetWeight,
        totalPallets,
        totalBoxes,
        totalUnits,
        totalPalletWeight: _.sumBy(palletGroup.products, p => (p.quantityPallets ?? 0) * (p.boxesPerPallet ?? 0) * (p.boxWeight ?? 0)),
        totalBoxWeight: _.sumBy(palletGroup.products, p => (p.quantityBoxes ?? 0) * (p.boxWeight ?? 0)),
        totalUnitWeight: _.sumBy(palletGroup.products, p => {
          const unitsPerBox = p.unitsPerBox || 1;
          const unitWeight = (p.boxWeight ?? 0) / unitsPerBox;
          return (p.quantityUnits ?? 0) * unitWeight;
        }),
        customerInfo: {
          code: items[0]?.customerCode,
          name: items[0]?.customerName
        },
        companyInfo: {
          code: items[0]?.warehouseProduct?.empresa || items[0]?.company || '',
          name: items[0]?.companyName || ''
        },
        line: items[0]?.warehouseProduct?.line || '',
        licensePlate: items[0]?.routing?.licensePlate || '',
        sequence: items[0]?.routing?.sequence || '',
        route: items[0]?.routing?.route || '',
        location: items[0]?.routing?.location || '',
        carrier: items[0]?.routing?.carrier || '',
        effectiveVehicle: items[0]?.routing?.effectiveVehicle || '',
        products: palletGroup.products.map(product => ({
          ...product,
          faixaProduto: product.faixaProduto,
          palletUsage: palletGroup.totalPalletUsage
        })),
        uniqueProducts: _.uniqBy(palletGroup.products, 'code').length,
        uniqueTransports: _.uniqBy(items, 'transport').length,
        palletNumber: palletGroup.palletNumber,
        palletUsage: palletGroup.totalPalletUsage,
        transport: items[0]?.transport || ''
      };
    });
  });
  const sortedEntries = _.orderBy(Object.entries(result), ['1.transport', '1.customerInfo.code']);
  return Object.fromEntries(sortedEntries);
} 