import { SummarizedGroup, SummarizedProduct } from "@/features/utils/summarize";
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore";
import _ from "lodash";
import GroupInfo from "./GroupInfo";
import GroupSummary from "./GroupSummary";

type Props = {
  group: SummarizedGroup
  groupKey: string
  total: number
  currentIndex: number
}

// Colunas fixas para unidades segregadas
const fixedColumns = [
  { key: "address", label: "Endereço" },
  { key: "code", label: "Código" },
  { key: "description", label: "Descrição" },
  { key: "batch", label: "Lote" },
  { key: "manufacturingDate", label: "Data Fab." },
  { key: "quantityUnits", label: "Unidades" },
];

export default function UnitSegreged({ group, groupKey, total, currentIndex }: Props) {
  const { units } = usePrintConfigStore()

  let data = _.filter(group.products, (product: SummarizedProduct) => product.quantityUnits > 0);

  const isTrue = units !== "same"

  // Função utilitária para pegar o valor da coluna
  const getColumnValue = (product: any, key: string) => {
    switch (key) {
      case "manufacturingDate":
        return product.manufacturingDate
          ? (product.manufacturingDate instanceof Date
            ? product.manufacturingDate.toLocaleDateString('pt-BR')
            : new Date(product.manufacturingDate).toLocaleDateString('pt-BR'))
          : "";
      default:
        return product[key] ?? "";
    }
  };

  return (
    <div>
      {data.length > 0 && isTrue && <div key={groupKey} className="bg-white rounded-lg shadow-md border border-gray-200">
      <GroupInfo 
          group={group}
          total={total}
          currentIndex={currentIndex}
          title={`${groupKey.split(" ")[0]} - UNIDADES SEPARADAS`}
        />
        <GroupSummary group={group} type="unit" qtdItems={data.length} />
        <div className="overflow-x-auto md:overflow-x-visible">
          <table className="w-full border-collapse md:table-fixed">
            <thead className="bg-gray-100">
              <tr>
                {fixedColumns.map(col => (
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
                  {fixedColumns.map(col => (
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
      </div>
      }
    </div>
  )
}