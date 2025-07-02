'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore"
import { Package } from "lucide-react"

export default function QuebraPalletConfig() {
  const {
    palletBreak,
    breakPercentage,
    setPalletBreak,
    setBreakPercentage,
  } = usePrintConfigStore()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Quebra de Pallet por Altura Padrão
          </CardTitle>
          <CardDescription>
            Configure a quebra automática baseada na altura padrão do pallet
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Como funciona:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Cálculo:</strong> Quantidade de caixas ÷ Capacidade do pallet = Altura padrão</li>
              <li>• <strong>Quebra:</strong> Quando a altura atual atinge X% da altura padrão, inicia nova separação</li>
              <li>• <strong>Benefício:</strong> Permite distribuir um mapa muito grande para vários separadores</li>
            </ul>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="palletBreak"
              checked={palletBreak}
              onCheckedChange={setPalletBreak}
            />
            <Label htmlFor="palletBreak" className="font-medium">
              Ativar quebra automática de pallet
            </Label>
          </div>

          {palletBreak && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="breakPercentage">Percentual de Quebra (%)</Label>
                <Input
                  id="breakPercentage"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="Ex: 80"
                  value={breakPercentage}
                  onChange={(e) => setBreakPercentage(parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Quebra o pallet quando atingir X% da altura padrão calculada
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-800">
                  <strong>Exemplo:</strong> Se um pallet tem capacidade para 100 caixas e você tem 75 caixas (75% da altura padrão),
                  com percentual de 80%, o sistema iniciará uma nova separação.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <h5 className="font-medium text-green-900 mb-1">Fórmula de Cálculo:</h5>
                <p className="text-sm text-green-800">
                  <strong>Altura Padrão =</strong> (Quantidade de Caixas ÷ Capacidade do Pallet) × 100%<br />
                  <strong>Quebra =</strong> Quando altura atual ≥ Percentual definido
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 