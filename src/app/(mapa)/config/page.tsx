'use client'

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Save,
  Printer
} from "lucide-react"

import { useRouter } from "next/navigation"
import AgrupamentoConfig from "./components/agrupamentoConfig"
import PercentuaisConfig from "./components/percentuaisConfig"
import QuebraPalletConfig from "./components/quebraPalletConfig"
import ParametrosConfig from "./components/parametrosConfig"

export default function ConfigPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Configuração de Impressão</h1>
          <p className="text-muted-foreground">
            Configure as opções de impressão dos mapas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
          <Button onClick={() => {
            router.push("/print")
          }} size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Imprimir
          </Button>
        </div>
      </div>

      <Tabs defaultValue="agrupamento" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="agrupamento">Agrupamento</TabsTrigger>
          <TabsTrigger value="datas">Percentuais</TabsTrigger>
          <TabsTrigger value="quebra">Quebra de Pallet</TabsTrigger>
          <TabsTrigger value="folhas">Parâmetros</TabsTrigger>
        </TabsList>

        <TabsContent value="agrupamento" className="space-y-4">
          <AgrupamentoConfig />
        </TabsContent>

        <TabsContent value="datas" className="space-y-6">
          <PercentuaisConfig />
        </TabsContent>

        <TabsContent value="quebra" className="space-y-6">
          <QuebraPalletConfig />
        </TabsContent>

        <TabsContent value="folhas" className="space-y-6">
          <ParametrosConfig />
        </TabsContent>
      </Tabs>
    </div>
  )
}


