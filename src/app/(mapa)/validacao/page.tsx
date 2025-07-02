'use client'
import { useRoutingStore } from "@/features/mapa/store/routingStore";
import { useShipmentStore } from "@/features/mapa/store/shipmentStore";
import { useWarehouseProductStore } from "@/features/mapa/store/warehouseProductStore";
import _ from "lodash";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  Package,
  Truck,
  CheckCircle2,
  ArrowRight,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function ValidacaoPage() {
  const { dataShipment } = useShipmentStore();
  const { dataWarehouseProduct } = useWarehouseProductStore();
  const { dataRouting } = useRoutingStore();
  const router = useRouter();

  // Lógica de validação (mantida)
  const failProduct = _.differenceBy(dataShipment, dataWarehouseProduct, 'skuCode');
  const failRouting = _.uniqBy(_.differenceBy(dataShipment, dataRouting, 'transport'), 'transport');

  // Dados únicos para resumo
  const uniqueProducts = _.uniqBy(dataShipment, 'skuCode');
  const uniqueTransports = _.uniqBy(dataShipment, 'transport');
  const totalItens = uniqueProducts.length;
  const totalTransportes = uniqueTransports.length;
  const itensUnicos = _.uniqBy(failProduct, 'skuCode');
  const transportesUnicos = _.uniqBy(failRouting, 'transport');
  const hasErrors = itensUnicos.length > 0;
  const hasWarnings = transportesUnicos.length > 0;

  // Early return para loading (simulação, pois não há loading real)
  // Se quiser loading real, pode adicionar um estado de loading

  return (
      <div className="container mx-auto p-6 space-y-6">
        {/* Resumo Geral */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {hasErrors ? (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              ) : hasWarnings ? (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              ) : (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              )}
              Resumo da Validação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total de Itens Únicos */}
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{totalItens}</div>
                <div className="text-sm text-muted-foreground">Itens Únicos</div>
              </div>
              {/* Total de Transportes */}
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold">{totalTransportes}</div>
                <div className="text-sm text-muted-foreground">Transportes</div>
              </div>
              {/* Itens sem Cadastro */}
              <div className="text-center p-4 bg-muted rounded-lg border border-destructive/20">
                <div className="text-2xl font-bold text-destructive">{itensUnicos.length}</div>
                <div className="text-sm text-muted-foreground">Itens sem Cadastro</div>
              </div>
              {/* Transportes Incompletos */}
              <div className="text-center p-4 bg-muted rounded-lg border border-yellow-300/20">
                <div className="text-2xl font-bold text-yellow-600">{transportesUnicos.length}</div>
                <div className="text-sm text-muted-foreground">Transportes Incompletos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alertas */}
        {hasErrors && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Erros críticos encontrados!</strong> Existem produtos sem cadastro que impedem o processamento. Corrija os problemas antes de prosseguir.
            </AlertDescription>
          </Alert>
        )}
        {!hasErrors && hasWarnings && (
          <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Alguns transportes não possuem roteirização cadastrada. Isso não impede o processamento, mas pode afetar a eficiência logística.
            </AlertDescription>
          </Alert>
        )}
        {!hasErrors && !hasWarnings && (
          <Alert className="border-green-200 bg-green-50 text-green-800">
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              Todos os dados foram validados com sucesso! Não foram encontradas inconsistências.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Itens sem Cadastro - CRÍTICO */}
          <Card className={itensUnicos.length > 0 ? "border-destructive" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Produtos sem Cadastro
                <Badge variant="destructive" className="ml-auto">
                  {itensUnicos.length}
                </Badge>
                {itensUnicos.length > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    CRÍTICO
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Produtos da remessa que não possuem cadastro no sistema - <strong>Impedem o processamento</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {itensUnicos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
                  <p>Todos os itens possuem cadastro válido</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {itensUnicos.map((item, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg bg-muted/50"
                    >
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm mb-1">
                            Código: {item.skuCode}
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {item.skuDescription || 'Descrição não disponível'}
                          </div>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          Shipment: {item.shipment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transportes sem Cadastro - INFORMATIVO */}
          <Card className={transportesUnicos.length > 0 ? "border-yellow-300" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Transportes sem Roteirização
                <Badge variant="secondary" className="ml-auto">
                  {transportesUnicos.length}
                </Badge>
                {transportesUnicos.length > 0 && (
                  <Badge
                    variant="outline"
                    className="text-xs border-yellow-300 text-yellow-700"
                  >
                    INFORMATIVO
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Transportadoras sem roteirização cadastrada - <strong>Não impede o processamento</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transportesUnicos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-600" />
                  <p>Todos os transportes possuem roteirização válida</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {transportesUnicos.map((item, index) => {
                    // Encontrar todos os itens que usam este transporte
                    const itemsWithThisTransport = dataShipment.filter(s => s.transport === item.transport);
                    const uniqueShipments = _.uniqBy(itemsWithThisTransport, 'shipment');
                    return (
                      <div
                        key={index}
                        className="p-3 border rounded-lg bg-muted/50"
                      >
                        <div className="flex justify-between items-start gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm mb-1">
                              Transporte: {item.transport}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {uniqueShipments.length} shipment{uniqueShipments.length !== 1 ? 's' : ''} / {itemsWithThisTransport.length} item{itemsWithThisTransport.length !== 1 ? 's' : ''} afetado{itemsWithThisTransport.length !== 1 ? 's' : ''}
                            </div>
                          </div>
                          <Badge variant="outline" className="shrink-0">
                            {item.transport}
                          </Badge>
                        </div>
                        {uniqueShipments.length > 0 && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                            <p className="font-medium text-gray-700 mb-1">Shipments:</p>
                            <div className="flex flex-wrap gap-1">
                              {uniqueShipments.slice(0, 5).map((ship, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {ship.shipment}
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
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Seção de Ações */}
        {(hasErrors || hasWarnings) && (
          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
              <CardDescription>
                {hasErrors
                  ? "Ações obrigatórias para resolver problemas críticos"
                  : "Recomendações para otimizar o processo"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {itensUnicos.length > 0 && (
                  <div className="flex items-start gap-3 p-3 border border-destructive/20 rounded-lg bg-destructive/5">
                    <div className="rounded-full bg-destructive/10 p-1">
                      <Package className="h-4 w-4 text-destructive" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-destructive">
                        🚨 Ação Obrigatória
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Cadastre os <strong>{itensUnicos.length} produtos faltantes</strong> no sistema antes de processar a remessa. Sem isso, o processamento será bloqueado.
                      </div>
                    </div>
                  </div>
                )}
                {transportesUnicos.length > 0 && (
                  <div className="flex items-start gap-3 p-3 border border-yellow-300/20 rounded-lg bg-yellow-50/50">
                    <div className="rounded-full bg-yellow-100 p-1">
                      <Truck className="h-4 w-4 text-yellow-700" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-yellow-800">
                        💡 Recomendação
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Ajuste o arquivo de Roteirização para todas as informações saírem no mapa de separação
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        {/* Botão de Continuar */}
        <div className="flex justify-end pt-6 gap-4">
          <Button
            variant="outline"
            onClick={() => router.push('/upload')}
            className="px-6 py-2"
            aria-label="Voltar ao Upload"
          >
            Voltar ao Upload
          </Button>
          <Button
            onClick={() => router.push('/config')}
            disabled={hasErrors}
            className={`px-6 py-2 rounded-md font-medium ${
              hasErrors
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
            aria-label="Ir para Configuração"
          >
            <Settings className="w-4 h-4 mr-2" />
            Ir para Configuração
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
  );
}
