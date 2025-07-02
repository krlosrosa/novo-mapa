import { SummarizedGroup } from "@/features/utils/summarize";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Palette, 
  Box, 
  Package2, 
  Weight, 
  Scale,
  Droplets
} from "lucide-react";

type Props = {
  group: SummarizedGroup
  type: 'pallet' | 'unit'
  qtdItems: number
}

export default function GroupSummary({ group, type, qtdItems }: Props) {
  const palletItems = [
    {
      label: "Itens",
      value: qtdItems,
      icon: Package
    },
    {
      label: "Pallets",
      value: group.totalPallets,
      icon: Palette
    },
    {
      label: "Peso Total",
      value: `${group.totalPalletWeight.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`,
      icon: Weight
    }
  ];

  const unitItems = [
    {
      label: "Itens",
      value: qtdItems,
      icon: Package
    },
    {
      label: "Unidades",
      value: group.totalUnits,
      icon: Package2
    },
    {
      label: "Peso Total",
      value: `${group.totalUnitWeight.toFixed(2)} kg`,
      icon: Package2
    },
  ];

  const summaryItems = type === 'pallet' ? palletItems : unitItems;

  return (
    <div className="bg-white border border-gray-200">
      <div className="px-4 py-3">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-6">
          {summaryItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-center gap-3 flex-shrink-0 min-w-0">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <IconComponent className="h-5 w-5 text-gray-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{item.value}</p>
                  <p className="text-xs text-gray-500 whitespace-nowrap">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 