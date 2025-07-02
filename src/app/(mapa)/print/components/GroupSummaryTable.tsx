import { 
  Package, 
  Boxes, 
  PackageOpen, 
  Weight, 
  Scale,
  Droplets
} from "lucide-react";
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  group: any;
  qtdItems: number;
}

export default function GroupSummaryTable({ group, qtdItems }: Props) {
  const { units, fullPallets } = usePrintConfigStore();

  // Sempre mostrar esses
  const summaryItems = [
    {
      label: "Itens",
      value: qtdItems,
      icon: Package
    },
    {
      label: "Caixas",
      value: group.totalBoxes,
      icon: Package
    },
    {
      label: "Peso Caixas",
      value: `${group.totalBoxWeight.toFixed(2)} kg`,
      icon: Weight
    }
  ];

  // Pallet
  if (fullPallets !== 'separate') {
    summaryItems.push(
      {
        label: "Pallets",
        value: group.totalPallets,
        icon: Boxes
      },
      {
        label: "Peso Pallets",
        value: `${group.totalPalletWeight.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kg`,
        icon: Weight
      }
    );
  }

  // Unidades
  if (units !== 'separate') {
    summaryItems.push(
      {
        label: "Unidades",
        value: group.totalUnits,
        icon: PackageOpen
      },
      {
        label: "Peso Unidades",
        value: `${group.totalUnitWeight.toFixed(2)} kg`,
        icon: Weight
      }
    );
  }

  return (
    <div className="bg-white border border-gray-200 group-summary print-avoid-break">
      <div className="px-4 py-3">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 md:gap-3">
          {summaryItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={index} className="flex items-center gap-1.5 flex-shrink-0 min-w-0">
                <div className="p-1 bg-gray-50 rounded">
                  <IconComponent className="h-3 w-3 text-gray-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-gray-900 whitespace-nowrap">{item.value}</p>
                  <p className="text-[10px] text-gray-500 whitespace-nowrap">{item.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 