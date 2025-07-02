'use client'
import _ from "lodash";
import { useEnrichedData } from "@/features/mapa/hooks/enrichedData";
import { SummarizedProduct, summarizeGroupedDataWithPalletBreak } from "@/features/utils/summarize";
import { groupedData } from "@/features/mapa/hooks/groupedItens";
import React from "react";

import Table from "./table";
import PalletSegreged from "./palletSegreged";
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore";
import ColumnConfigModal from "./ColumnConfigModal";
import UnitSegreged from "./unitSegreged";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { useMapaPrint, HeaderConfig, createTransportPageStyle } from "@/hooks/use-mapa-print";
import { useSession } from "next-auth/react";



export default function PrintPage() {
  const { fifoRanges, segregateProductFIFO, palletBreak, breakPercentage } = usePrintConfigStore();
  const enrichedData = useEnrichedData();
  //pegar nome do usuario logado
  const { data: session } = useSession();
  const user = session?.user;


  const data = groupedData({ enrichedData, isFifo: segregateProductFIFO, fifoRanges });
  const summarizedData = summarizeGroupedDataWithPalletBreak(data, palletBreak, breakPercentage);

  // Agrupa os grupos por transporte
  const transportGroups = React.useMemo(() => {
    return Object.entries(summarizedData).reduce((acc, [groupKey, group]) => {
      if (!acc[group.transport]) acc[group.transport] = [];
      acc[group.transport].push(groupKey);
      return acc;
    }, {} as Record<string, string[]>);
  }, [summarizedData]);

  const transportesUnicos = React.useMemo(() => {
    return Array.from(new Set(Object.values(summarizedData).map((group: any) => group.transport)));
  }, [summarizedData]);

  const headerConfig: HeaderConfig = {
    title: "Mapa de Separação",
    subtitle: "Relatório de Produtos",
    company: "Sua Empresa Ltda",
    showLogo: true,
    logo: "/logo.png",
    showDate: true,
    printedBy: user?.name,
    // date: "2024-01-15" // opcional
  };

  const { componentRef, handlePrint } = useMapaPrint({
    headerConfig,
    pageStyle: createTransportPageStyle(transportesUnicos, headerConfig),
    onBeforePrint: async () => {
      console.log('Preparando impressão...');
    },
    onAfterPrint: () => {
      console.log('Impressão concluída');
    }
  });


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold text-gray-800">Resumo de Dados</h1>
        <div className="flex gap-2">
          <ColumnConfigModal />
          <Button
            onClick={handlePrint}
            className="flex items-center gap-2"
            aria-label="Imprimir mapa"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </Button>
        </div>
      </div>
      <p className="text-sm text-gray-500">
        Info: {JSON.stringify(user?.name)}
      </p>

      {/* Conteúdo para impressão */}
      <div ref={componentRef} className="print-content">
        {Object.entries(summarizedData).map(([groupKey, group], index) => {
          //Verificar se tem itens no pallet Segregado
          const hasPalletSegreged = group.products.some((product: SummarizedProduct) => product.quantityPallets > 0);
          const hasUnitSegreged = group.products.some((product: SummarizedProduct) => product.quantityUnits > 0);
          const groupKeysForTransport = transportGroups[group.transport] || [];
          const currentIndex = groupKeysForTransport.indexOf(groupKey) + 1;
          const total = groupKeysForTransport.length;
          const isFirstGroup = index === 0;

          return (
            <div
              className={`group-container page-transporte-${group.transport} ${isFirstGroup ? '' : 'print-page-break'}`}
              key={groupKey}
            >
              {/* Tabela principal */}
              <div className="print-avoid-break mb-4">
                <Table group={group} groupKey={groupKey} total={total} currentIndex={currentIndex} />
              </div>

              {/* Pallet Segregado - nova página se necessário */}
              {hasPalletSegreged && <div className="print-page-break my-2">
                <PalletSegreged group={group} groupKey={groupKey} total={total} currentIndex={currentIndex} />
              </div>}

              {/* Unidades - nova página se necessário */}
              {hasUnitSegreged && <div className="print-page-break my-2">
                <UnitSegreged group={group} groupKey={groupKey} total={total} currentIndex={currentIndex} />
              </div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
