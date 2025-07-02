import { SummarizedGroup, SummarizedProduct } from "@/features/utils/summarize";
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore";
import _ from "lodash";
import GroupSummary from "./GroupSummary";
import GroupInfo from "./GroupInfo";


type Props = {
  group: SummarizedGroup
  groupKey: string
  total: number
  currentIndex: number
}

export default function PalletSegreged({ group, groupKey, total, currentIndex }: Props) {
  const { fullPallets } = usePrintConfigStore()

  let data = _.filter(group.products, (product: SummarizedProduct) => product.quantityPallets > 0);

  const isTrue = fullPallets !== "same"

  // Função utilitária para pegar o valor da coluna
  const getColumnValue = (product: any, key: string) => {
    switch (key) {
      case "sku":
        return product.code ?? "";
      case "description":
        return product.description ?? "";
      case "lot":
        return product.batch ?? "";
      case "quantityPallets":
        return product.quantityPallets ?? "";
      default:
        return "";
    }
  };

  return (
    <div>
      {data.length > 0 && isTrue && <div key={groupKey} className="bg-white rounded-lg shadow-md border border-gray-200">
        <GroupInfo 
          group={group}
          total={total}
          currentIndex={currentIndex}
          title={`${groupKey.split(" ")[0]} -   PALLET FULL`}
        />
        <GroupSummary group={group} type="pallet" qtdItems={data.length} />
        <div className="overflow-x-auto md:overflow-x-visible">
          <table className="w-full border-collapse md:table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-1 py-0.5 text-left text-[10px] font-semibold text-gray-700 uppercase tracking-wide border border-gray-300 whitespace-nowrap">Sku</th>
                <th className="px-1 py-0.5 text-left text-[10px] font-semibold text-gray-700 uppercase tracking-wide border border-gray-300 whitespace-nowrap">Descrição</th>
                <th className="px-1 py-0.5 text-left text-[10px] font-semibold text-gray-700 uppercase tracking-wide border border-gray-300 whitespace-nowrap">Lote</th>
                <th className="px-1 py-0.5 text-left text-[10px] font-semibold text-gray-700 uppercase tracking-wide border border-gray-300 whitespace-nowrap">Qtd. de pallets</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((product, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-1 py-0.5 text-[10px] text-gray-600 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">{getColumnValue(product, "sku")}</td>
                  <td className="px-1 py-0.5 text-[10px] text-gray-600 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">{getColumnValue(product, "description")}</td>
                  <td className="px-1 py-0.5 text-[10px] text-gray-600 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">{getColumnValue(product, "lot")}</td>
                  <td className="px-1 py-0.5 text-[10px] text-gray-600 border border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">{getColumnValue(product, "quantityPallets")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      }
    </div>
  )
}