'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Package2,
  Layers,
  Router,
  Package,
  X,
  Target
} from "lucide-react"
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore"

type SheetConfig = "same" | "separate" | "both"

export default function ParametrosConfig() {
  const {
    fullPallets,
    units,
    showDateRange,
    convertBoxesToPallet,
    segregateProductFIFO,
    fifoRanges,
    setFullPallets,
    setUnits,
    setShowDateRange,
    setConvertBoxesToPallet,
    setSegregateProductFIFO,
    addFifoRange,
    removeFifoRange,
    showFaixa,
    setShowFaixa,
  } = usePrintConfigStore()

  // Faixas disponíveis para seleção
  const availableRanges = ["Vermelha", "Laranja", "Amarela"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Parâmetros do Mapa de Separação
          </CardTitle>
          <CardDescription>
            Defina quais informações serão exibidas no mapa de separação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Mesma folha:</strong> Exibe a informação junto com os demais dados</li>
              <li>• <strong>Folha separada:</strong> Cria uma seção específica para essa informação</li>
              <li>• <strong>Ambos:</strong> Exibe tanto na folha principal quanto em seção separada</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border rounded-lg p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package2 className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="font-medium text-blue-900">Pallets Full</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input  
                    type="radio"
                    id="palletsSame"
                    name="fullPallets"
                    value="same"
                    checked={fullPallets === "same"}
                    onChange={(e) => setFullPallets(e.target.value as SheetConfig)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="palletsSame" className="text-sm">Mesma folha</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="palletsSeparate"
                    name="fullPallets"
                    value="separate"
                    checked={fullPallets === "separate"}
                    onChange={(e) => setFullPallets(e.target.value as SheetConfig)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="palletsSeparate" className="text-sm">Folha separada</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="palletsBoth"
                    name="fullPallets"
                    value="both"
                    checked={fullPallets === "both"}
                    onChange={(e) => setFullPallets(e.target.value as SheetConfig)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="palletsBoth" className="text-sm">Ambos</Label>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Layers className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-medium text-green-900">Unidades</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="unitsSame"
                    name="units"
                    value="same"
                    checked={units === "same"}
                    onChange={(e) => setUnits(e.target.value as SheetConfig)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="unitsSame" className="text-sm">Mesma folha</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="unitsSeparate"
                    name="units"
                    value="separate"
                    checked={units === "separate"}
                    onChange={(e) => setUnits(e.target.value as SheetConfig)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="unitsSeparate" className="text-sm">Folha separada</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="unitsBoth"
                    name="units"
                    value="both"
                    checked={units === "both"}
                    onChange={(e) => setUnits(e.target.value as SheetConfig)}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="unitsBoth" className="text-sm">Ambos</Label>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gradient-to-br from-amber-50 to-orange-50">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-amber-100 rounded-lg">
                  <Target className="w-5 h-5 text-amber-600" />
                </div>
                <h4 className="font-medium text-amber-900">Faixa</h4>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="showFaixa"
                    checked={showFaixa}
                    onCheckedChange={setShowFaixa}
                  />
                  <Label htmlFor="showFaixa" className="text-sm">
                    Exibir faixa no mapa
                  </Label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Mostra a classificação por faixa (Verde, Amarela, Laranja, Vermelha) dos produtos no mapa de separação.
                </p>
              </div>
            </div>

          </div>

          <div className="border rounded-lg p-4 bg-gradient-to-br from-purple-50 to-violet-50 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-200 rounded-lg">
                <Router className="w-5 h-5 text-purple-600" />
              </div>
              <h4 className="font-medium text-purple-900">Segregação FIFO</h4>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="segregateProductFIFO"
                checked={segregateProductFIFO}
                onCheckedChange={setSegregateProductFIFO}
              />
              <Label htmlFor="segregateProductFIFO" className="text-sm">
                Segregar produtos em faixa em mapa separado
              </Label>
            </div>
            
            {segregateProductFIFO && (
              <div className="mt-4 space-y-3">
                <div>
                  <Label className="text-sm font-medium text-purple-900">
                    Selecione as faixas para separar:
                  </Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {availableRanges.map((faixa) => (
                      <div key={faixa} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`faixa-${faixa}`}
                          checked={fifoRanges.includes(faixa)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              addFifoRange(faixa)
                            } else {
                              removeFifoRange(faixa)
                            }
                          }}
                          className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500"
                        />
                        <Label 
                          htmlFor={`faixa-${faixa}`} 
                          className="text-sm cursor-pointer"
                        >
                          {faixa}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {fifoRanges.length > 0 && (
                  <div className="bg-purple-100 border border-purple-200 rounded-lg p-3">
                    <p className="text-xs text-purple-800 mb-2">
                      <strong>Faixas selecionadas:</strong>
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {fifoRanges.map((faixa: string) => (
                        <Badge key={faixa} variant="secondary" className="flex items-center gap-1 text-xs">
                          {faixa}
                          <button
                            onClick={() => removeFifoRange(faixa)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <p className="text-xs text-muted-foreground mt-1">
              Se ativado, produtos que estão nas faixas selecionadas serão separados em um mapa específico, separado dos demais produtos.
            </p>
          </div>

          <div className="border rounded-lg p-4 bg-gradient-to-br from-gray-50 to-gray-100 mt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-gray-200 rounded-lg">
                <Package className="w-5 h-5 text-gray-600" />
              </div>
              <h4 className="font-medium text-gray-900">Conversão de Caixas</h4>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="convertBoxesToPallet"
                checked={convertBoxesToPallet}
                onCheckedChange={setConvertBoxesToPallet}
              />
              <Label htmlFor="convertBoxesToPallet" className="text-sm">
                Converter caixas para formar pallet (default)
              </Label>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Se ativado, as caixas serão agrupadas automaticamente para formar pallets completos. Se desativado, a quantidade de caixas será mantida sem conversão.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}