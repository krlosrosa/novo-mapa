'use client'

import UploadProduct from "./components/uploadProduct";
import UploadRouting from "./components/uploadRouting";
import UploadShipment from "./components/uploadShipment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Upload } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useShipmentStore } from "@/features/mapa/store/shipmentStore";
import { useWarehouseProductStore } from "@/features/mapa/store/warehouseProductStore";

export default function UploadPage() {
  const router = useRouter();
  const { dataShipment } = useShipmentStore();
  const { dataWarehouseProduct } = useWarehouseProductStore();

  const handleAdd = () => {
    router.push('/validacao');
  };

  // Verifica se os arquivos obrigatórios foram carregados
  const isFormValid = dataShipment && dataShipment.length > 0 && 
                     dataWarehouseProduct && dataWarehouseProduct.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Upload de Arquivos</h1>
              <p className="text-muted-foreground">Carregue os dados necessários para gerar os mapas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-blue-600" />
                Remessas
              </CardTitle>
              <CardDescription>
                Carregue o arquivo de remessas e entregas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadShipment />
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-green-600" />
                Produtos
              </CardTitle>
              <CardDescription>
                Carregue o arquivo de material
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadProduct />
            </CardContent>
          </Card>

          <Card className="border border-border shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-purple-600" />
                Roteirização
              </CardTitle>
              <CardDescription>
                Carregue o arquivo com dados de roteirização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UploadRouting />
            </CardContent>
          </Card>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button 
            onClick={handleAdd}
            size="lg"
            className="px-8 py-3 text-lg font-medium"
            disabled={!isFormValid}
          >
            Continuar para Validação
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          
          {!isFormValid && (
            <p className="text-sm text-muted-foreground mt-2">
              Carregue os arquivos de Remessas e Produtos para continuar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}