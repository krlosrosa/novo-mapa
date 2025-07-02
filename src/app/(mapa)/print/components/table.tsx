import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore";
import { SummarizedGroup, SummarizedProduct } from "@/features/utils/summarize";
import _ from "lodash";
import type { SheetConfig } from "@/features/mapa/store/printConfigStore";
import React from "react";
import { useColumnConfigStore, allColumns } from "@/features/mapa/store/columnConfigStore";
import GroupSummary from "./GroupSummary";
import GroupInfoTable from "./GroupInfoTable";
import GroupSummaryTable from "./GroupSummaryTable";

type Props = {
  group: SummarizedGroup
  groupKey: string
  total: number
  currentIndex: number
}

export default function Table({ group, groupKey, total, currentIndex }: Props) {
  const { units, fullPallets } = usePrintConfigStore()
  const { selectedColumns, columnOrder } = useColumnConfigStore();

  let data = []
  if(fullPallets === "separate") {
    const filtrarPallet = _.filter(group.products, (product:SummarizedProduct) => product.quantityBoxes > 0 || product.quantityUnits > 0);
    data = filtrarPallet;
  }

  if(units === "separate") {
    const filtrarUnits = _.filter(group.products, (product:SummarizedProduct) => product.quantityBoxes > 0 || product.quantityPallets > 0);
    data = filtrarUnits;
  } else {
    data = group.products;
  }

  // Usa a ordem salva das colunas para ordenar
  const columnsToShow = allColumns.filter(col => selectedColumns.includes(col.key));
  columnsToShow.sort((a, b) => columnOrder.indexOf(a.key) - columnOrder.indexOf(b.key));

  // Função utilitária para pegar o valor da coluna
  const getColumnValue = (product: any, key: string) => {
    switch (key) {
      case "faixa":
        return product.faixaProduto?.faixa ?? "";
      case "manufacturingDate":
        return product.manufacturingDate
          ? (product.manufacturingDate instanceof Date
            ? product.manufacturingDate.toLocaleDateString('pt-BR')
            : new Date(product.manufacturingDate).toLocaleDateString('pt-BR'))
          : "";
      case "dataMinima":
        return product.faixaProduto?.dataMinima
          ? (product.faixaProduto.dataMinima instanceof Date
            ? product.faixaProduto.dataMinima.toLocaleDateString('pt-BR')
            : new Date(product.faixaProduto.dataMinima).toLocaleDateString('pt-BR'))
          : "";
      case "dataMaxima":
        return product.faixaProduto?.dataMaxima
          ? (product.faixaProduto.dataMaxima instanceof Date
            ? product.faixaProduto.dataMaxima.toLocaleDateString('pt-BR')
            : new Date(product.faixaProduto.dataMaxima).toLocaleDateString('pt-BR'))
          : "";
      case "percentualPallet":
        return (
          <span className={`inline-block px-1 py-0.5 rounded text-xs font-medium whitespace-nowrap ${product.percentualPallet > 80 ? 'bg-green-100 text-green-800' :
            product.percentualPallet > 50 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
            {product.percentualPallet.toFixed(1)}%
          </span>
        );
      default:
        return product[key] ?? "";
    }
  };

  return (
    <div>
      {group.products.length > 0 && <div key={groupKey} className="bg-white rounded-lg shadow-md border border-gray-200">
        {/* Cabeçalho do Grupo */}
        <GroupInfoTable group={group} total={total} currentIndex={currentIndex} title={groupKey}/>

        {/* Resumo Geral */}
        <GroupSummaryTable group={group} qtdItems={data.length} />

        {/* Tabela de Produtos */}
        <div className="overflow-x-auto md:overflow-x-visible">
          <table className="w-full border-collapse md:table-fixed">
            <thead className="bg-gray-100">
              <tr>
                {columnsToShow.map(col => (
                  <th 
                    key={col.key} 
                    data-column={col.key}
                    className={`px-1 py-0.5 text-left text-[10px] font-semibold text-gray-700 uppercase tracking-wide border border-gray-300 ${col.key === 'description' ? 'md:w-auto' : 'whitespace-nowrap md:w-fit'}`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columnsToShow.map(col => (
                    <td 
                      key={col.key} 
                      data-column={col.key}
                      className={`px-1 py-0.5 text-[10px] text-gray-600 border border-gray-200 ${col.key === 'description' ? 'md:w-auto' : 'whitespace-nowrap md:w-fit'} overflow-hidden text-ellipsis`}
                    >
                      {getColumnValue(product, col.key)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>}
    </div>
  );
}