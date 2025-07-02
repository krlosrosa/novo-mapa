"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import dynamic from "next/dynamic";

// Importação dinâmica para evitar problemas de SSR
const Separacao = dynamic(() => import("./components/separacao"), { ssr: false });

// Placeholder para Carregamento
const CarregamentoPlaceholder = () => (
  <div className="p-8 text-center text-muted-foreground border rounded-lg bg-muted/50">
    <h2 className="text-xl font-bold mb-2">Mapa de Carregamento</h2>
    <p>Em breve: componente de impressão de carregamento.</p>
  </div>
);

export default function PrintTabsPage() {
  const [tab, setTab] = useState("separacao");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Menu superior */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 no-print">
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="gap-2">
            <TabsTrigger value="separacao">Separação</TabsTrigger>
            <TabsTrigger value="carregamento">Carregamento</TabsTrigger>
          </TabsList>
          <TabsContent value="separacao">
            <Separacao />
          </TabsContent>
          <TabsContent value="carregamento">
            <CarregamentoPlaceholder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
