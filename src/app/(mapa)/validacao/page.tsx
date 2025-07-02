'use client'
import { useRoutingStore } from "@/features/mapa/store/routingStore";
import { useShipmentStore } from "@/features/mapa/store/shipmentStore";
import { useWarehouseProductStore } from "@/features/mapa/store/warehouseProductStore";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle, 
  ArrowRight,
  Package,
  Truck,
  Settings
} from "lucide-react";

export default function ValidacaoPage() {
  const { dataShipment } = useShipmentStore();
  const { dataWarehouseProduct } = useWarehouseProductStore();
  const { dataRouting } = useRoutingStore();
  const router = useRouter();

  const failProduct = _.differenceBy(dataShipment, dataWarehouseProduct, 'skuCode');
  const failRouting = _.uniqBy(_.differenceBy(dataShipment, dataRouting, 'transport'), 'transport');

  const hasCriticalErrors = failProduct.length > 0;
  const hasWarnings = failRouting.length > 0;
  const canProceed = !hasCriticalErrors;

  const handleProceedToConfig = () => {
    router.push('/config');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Validação de Dados</h1>
          <p className="text-gray-600">Verificação de integridade dos dados carregados</p>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${hasCriticalErrors ? 'bg-red-100' : 'bg-green-100'}`}>
                    {hasCriticalErrors ? (
                      <XCircle className="w-6 h-6 text-red-600" />
                    ) : (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Status Geral</p>
                    <p className={`text-lg font-bold ${hasCriticalErrors ? 'text-red-600' : 'text-green-600'}`}>
                      {hasCriticalErrors ? 'Com Erros' : 'Aprovado'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-full">
                    <Package className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Produtos Faltantes</p>
                    <p className="text-lg font-bold text-red-600">{failProduct.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <Truck className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Rotas Faltantes</p>
                    <p className="text-lg font-bold text-yellow-600">{failRouting.length}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Critical Errors - Products */}
        {hasCriticalErrors && (
          <Card className="bg-white shadow-lg border-red-200">
            <CardHeader className="bg-red-50 border-b border-red-200">
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                Erros Críticos - Produtos Não Encontrados
              </CardTitle>
              <CardDescription className="text-red-700">
                Estes produtos não possuem cadastro no sistema e impedem o processamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="destructive" className="text-sm">
                    {failProduct.length} produto{failProduct.length !== 1 ? 's' : ''} sem cadastro
                  </Badge>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {failProduct.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border border-red-200">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{product.skuCode}</p>
                          <p className="text-sm text-gray-600">{product.skuDescription || 'Descrição não disponível'}</p>
                        </div>
                        <Badge variant="outline" className="text-red-600 border-red-300">
                          SKU: {product.skuCode}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <Alert className="bg-red-50 border-red-200">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <strong>Ação necessária:</strong> Cadastre estes produtos no sistema antes de prosseguir.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Warnings - Routing */}
        {hasWarnings && (
          <Card className="bg-white shadow-lg border-yellow-200">
            <CardHeader className="bg-yellow-50 border-b border-yellow-200">
              <CardTitle className="flex items-center gap-2 text-yellow-800">
                <Info className="w-5 h-5" />
                Avisos - Rotas Não Encontradas
              </CardTitle>
              <CardDescription className="text-yellow-700">
                Estas rotas de transporte não possuem cadastro, mas não impedem o processamento.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-sm bg-yellow-100 text-yellow-800">
                    {failRouting.length} rota{failRouting.length !== 1 ? 's' : ''} sem cadastro
                  </Badge>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    {failRouting.map((route, index) => {
                      // Encontrar todos os itens que usam este transporte
                      const itemsWithThisTransport = dataShipment.filter(item => item.transport === route.transport);
                      const uniqueShipments = _.uniqBy(itemsWithThisTransport, 'shipment');
                      
                      return (
                        <div key={index} className="p-4 bg-white rounded border border-yellow-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{route.transport}</p>
                              <p className="text-sm text-gray-600">Transporte não cadastrado</p>
                            </div>
                            <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                              {route.transport}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Shipments afetados:</span>
                              <Badge variant="secondary" className="text-xs">
                                {uniqueShipments.length} shipment{uniqueShipments.length !== 1 ? 's' : ''}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Itens afetados:</span>
                              <Badge variant="secondary" className="text-xs">
                                {itemsWithThisTransport.length} item{itemsWithThisTransport.length !== 1 ? 's' : ''}
                              </Badge>
                            </div>
                            
                            {uniqueShipments.length > 0 && (
                              <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                                <p className="font-medium text-gray-700 mb-1">Shipments:</p>
                                <div className="flex flex-wrap gap-1">
                                  {uniqueShipments.slice(0, 5).map((item, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {item.shipment}
                                    </Badge>
                                  ))}
                                  {uniqueShipments.length > 5 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{uniqueShipments.length - 5} mais
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Alert className="bg-yellow-50 border-yellow-200">
                  <Info className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-800">
                    <strong>Recomendação:</strong> Cadastre estas rotas para melhor organização dos dados.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success State */}
        {!hasCriticalErrors && !hasWarnings && (
          <Card className="bg-white shadow-lg border-green-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                Validação Aprovada
              </CardTitle>
              <CardDescription className="text-green-700">
                Todos os dados foram validados com sucesso!
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="p-4 bg-green-100 rounded-full w-fit mx-auto">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <p className="text-green-800 font-medium">
                  Não foram encontrados erros críticos nos dados carregados.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => router.push('/upload')}
            className="px-6 py-3"
          >
            Voltar ao Upload
          </Button>
          
          <Button
            onClick={handleProceedToConfig}
            disabled={!canProceed}
            className={`px-6 py-3 ${canProceed ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
          >
            <Settings className="w-4 h-4 mr-2" />
            Ir para Configuração
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Summary Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>
            {hasCriticalErrors 
              ? `Encontrados ${failProduct.length} erro${failProduct.length !== 1 ? 's' : ''} crítico${failProduct.length !== 1 ? 's' : ''} que impedem o processamento.`
              : hasWarnings
              ? `Validação aprovada com ${failRouting.length} aviso${failRouting.length !== 1 ? 's' : ''} sobre rotas não cadastradas.`
              : 'Todos os dados foram validados com sucesso!'
            }
          </p>
        </div>
      </div>
    </div>
  );
}
