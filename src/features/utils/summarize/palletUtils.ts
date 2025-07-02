import { SummarizedProduct } from './summarizeTypes';
import _ from 'lodash';

export interface PalletGroup {
  palletNumber: number;
  products: SummarizedProduct[];
  totalPalletUsage: number;
  items: any[];
}

export function breakIntoPallets(
  products: SummarizedProduct[],
  items: any[],
  palletBreakThreshold: number
): PalletGroup[] {
  const palletGroups: PalletGroup[] = [];
  let currentPalletNumber = 1;
  let currentPalletUsage = 0;
  let currentGroupProducts: SummarizedProduct[] = [];
  let currentGroupItems: any[] = [];

  for (const product of products) {
    const productPalletUsage = product.percentualPallet;
    const productItems = items.filter(i => i.skuCode === product.code && i.batch === product.batch && String(i.manufacturingDate) === String(product.manufacturingDate));
    if (currentPalletUsage + productPalletUsage > palletBreakThreshold && currentGroupProducts.length > 0) {
      palletGroups.push({
        palletNumber: currentPalletNumber,
        products: [...currentGroupProducts],
        totalPalletUsage: currentPalletUsage,
        items: [...currentGroupItems]
      });
      currentPalletNumber++;
      currentPalletUsage = productPalletUsage;
      currentGroupProducts = [product];
      currentGroupItems = [...productItems];
    } else {
      currentPalletUsage += productPalletUsage;
      currentGroupProducts.push(product);
      currentGroupItems.push(...productItems);
    }
  }
  if (currentGroupProducts.length > 0) {
    palletGroups.push({
      palletNumber: currentPalletNumber,
      products: [...currentGroupProducts],
      totalPalletUsage: currentPalletUsage,
      items: [...currentGroupItems]
    });
  }
  return palletGroups;
} 