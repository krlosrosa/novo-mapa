'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "lucide-react"
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore"

export default function PercentuaisConfig() {
  const {
    minPercentage,
    maxPercentage,
    showDateRange,
    setMinPercentage,
    setMaxPercentage,
    setShowDateRange,
  } = usePrintConfigStore()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Range de Data por Fabricação
          </CardTitle>
          <CardDescription>
            Defina a margem de datas baseada na fabricação dos produtos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-medium text-green-900">Exibir Range no Mapa</h4>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="showDateRange"
                checked={showDateRange}
                onCheckedChange={setShowDateRange}
              />
              <Label htmlFor="showDateRange" className="text-sm">
                Exibir range de data no mapa de separação
              </Label>
            </div>
            <p className="text-xs text-muted-foreground">
              Quando ativado, o mapa exibirá o range de datas calculado baseado nos percentuais definidos abaixo.
            </p>
          </div>

          {showDateRange && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• <strong>Produtos Verdes:</strong> Aplica o cálculo reduzindo/aumentando a data de fabricação conforme o percentual definido</li>
                  <li>• <strong>Outras Faixas:</strong> Exibe a data de fabricação real do produto</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="percentualMinimo">Percentual Mínimo (%)</Label>
                  <Input
                    id="percentualMinimo"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Ex: 10"
                    value={minPercentage}
                    onChange={(e) => setMinPercentage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Reduz a data de fabricação em X% para produtos verdes
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="percentualMaximo">Percentual Máximo (%)</Label>
                  <Input
                    id="percentualMaximo"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Ex: 20"
                    value={maxPercentage}
                    onChange={(e) => setMaxPercentage(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Aumenta a data de fabricação em X% para produtos verdes
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Exemplo:</strong> Se um produto verde tem fabricação em 15/01/2024 e você define 10% mínimo e 20% máximo,
                  o range será de 05/01/2024 a 18/01/2024.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 