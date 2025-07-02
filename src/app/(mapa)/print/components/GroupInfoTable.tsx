import { SummarizedGroup } from "@/features/utils/summarize";
import { Card, CardContent } from "@/components/ui/card";
import { QRCodeSVG } from 'qrcode.react';
import {
  Truck,
  User,
  Building,
  Route,
  MapPin,
  Hash,
  Package,
  Snowflake,
  Sun
} from "lucide-react";
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore";

type Props = {
  group: SummarizedGroup
  total: number
  currentIndex: number
  title: string
}

export default function GroupInfoTable({ group, total, currentIndex, title }: Props) {
  const { groupingType } = usePrintConfigStore();
  return (
    <Card className="p-1 border-none">
      <CardContent className="p-1.5 border-none">
        <div className="flex gap-3 group-info-container print-avoid-break">
          {/* Lado Esquerdo - Informações */}
          <div className="flex-1 group-info-left">
            {/* Segunda linha - Empresa e Linha destacadas */}
            <div className="flex items-center justify-between gap-4 mb-2 p-2 bg-gray-50 rounded-md">
              <div className="flex items-center gap-4">
                <Package className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-sm">
                  {title.split(' ')[0]}
                </span>
                <div className="flex items-center gap-1.5">
                  <Building className="h-4 w-4 text-blue-600" />
                  <span className="font-semibold text-sm text-gray-800">Empresa:</span>
                  <span className="font-medium text-sm text-gray-700">{group.companyInfo.code}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {group.line?.toUpperCase().includes('REFRI') ? (
                    <Snowflake className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Sun className="h-4 w-4 text-orange-500" />
                  )}
                  <span className="font-semibold text-sm text-gray-800">Linha:</span>
                  <span className="font-medium text-sm text-gray-700">{group.line}</span>
                </div>
              </div>
                <div className="flex items-center gap-1.5">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-sm text-gray-800">Pallet:</span>
                  <span className="font-medium text-sm text-gray-700">{group.palletNumber}</span>
                </div>
            </div>

            {/* Terceira linha - Demais informações */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1.5 text-xs">
              <div className="flex items-center gap-1.5">
                <Truck className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-gray-700">Transporte:</span>
                <span className="text-gray-600">{group.transport}{total > 1 ? ` ${currentIndex}/${total}` : ''}</span>
              </div>

              {groupingType === "customerCode" && <div className="flex items-center gap-1.5">
                <User className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-gray-700">Cliente:</span>
                <span className="text-gray-600">{group.customerInfo.code}</span>
              </div>}

              <div className="flex items-center gap-1.5">
                <Hash className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-gray-700">Placa:</span>
                <span className="text-gray-600">{group.licensePlate}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Hash className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-gray-700">Sequência:</span>
                <span className="text-gray-600">{group.sequence}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-gray-700">Local:</span>
                <span className="text-gray-600">{group.location}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Route className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-gray-700">Rota:</span>
                <span className="text-gray-600">{group.route}</span>
              </div>

              <div className="flex items-center gap-1.5 sm:col-span-3">
                <Truck className="h-3 w-3 text-muted-foreground" />
                <span className="font-medium text-gray-700">Transportadora:</span>
                <span className="text-gray-600">{group.carrier}</span>
              </div>
            </div>
          </div>

          {/* Lado Direito - QR Code */}
          <div className="flex-shrink-0 group-info-qr">
            <div className="border border-dashed border-gray-300 rounded flex items-center justify-center">
              <QRCodeSVG 
                className="w-full h-full p-1"
                value={group.transport} 
                size={80}
                level="L"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 