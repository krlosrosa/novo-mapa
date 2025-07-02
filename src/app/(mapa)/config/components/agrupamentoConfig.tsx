'use client'

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Users,
  Truck,
  Plus,
  X,
  Package
} from "lucide-react"

import { usePrintConfigStore } from "@/features/mapa/store/printConfigStore"
import { UploadClientesSegregados } from "./UploadClientesSegregados"

type GroupingType = "customerCode" | "transport"

export default function AgrupamentoConfig() {
  const {
    groupingType,
    segregatedClients,
    transportGroups,
    clientGroups,
    setGroupingType,
    addClient,
    removeClient,
    addTransportGroup,
    removeTransportGroup,
    addTransportToGroup,
    removeTransportFromGroup,
    addClientGroup,
    removeClientGroup,
    addClientToGroup,
    removeClientFromGroup,
  } = usePrintConfigStore()

  // Estados locais para inputs
  const [novoCliente, setNovoCliente] = useState("")
  const [novoGrupo, setNovoGrupo] = useState("")
  const [novoTransporte, setNovoTransporte] = useState("")
  const [novoClienteGrupo, setNovoClienteGrupo] = useState("")
  const [grupoSelecionado, setGrupoSelecionado] = useState("")
  const [grupoClienteSelecionado, setGrupoClienteSelecionado] = useState("")

  const handleAdicionarCliente = () => {
    if (novoCliente) {
      addClient(novoCliente)
      setNovoCliente("")
    }
  }

  const handleAdicionarGrupo = () => {
    if (novoGrupo) {
      addTransportGroup(novoGrupo)
      setNovoGrupo("")
    }
  }

  const handleAdicionarGrupoCliente = () => {
    if (novoGrupo) {
      addClientGroup(novoGrupo)
      setNovoGrupo("")
    }
  }

  const handleAdicionarTransporte = () => {
    if (novoTransporte && grupoSelecionado) {
      addTransportToGroup(grupoSelecionado, novoTransporte)
      setNovoTransporte("")
    }
  }

  const handleAdicionarClienteGrupo = () => {
    if (novoClienteGrupo && grupoClienteSelecionado) {
      addClientToGroup(grupoClienteSelecionado, novoClienteGrupo)
      setNovoClienteGrupo("")
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Settings className="w-4 h-4" />
            Tipo de Agrupamento
          </CardTitle>
          <CardDescription>
            Defina como os dados serão agrupados na impressão
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="cliente"
              name="agrupamento"
              value="customerCode"
              checked={groupingType === "customerCode"}
              onChange={(e) => setGroupingType(e.target.value as GroupingType)}
              className="w-4 h-4"
            />
            <Label htmlFor="cliente" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Por Cliente
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="transporte"
              name="agrupamento"
              value="transport"
              checked={groupingType === "transport"}
              onChange={(e) => setGroupingType(e.target.value as GroupingType)}
              className="w-4 h-4"
            />
            <Label htmlFor="transporte" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Por Transporte
            </Label>
          </div>
        </CardContent>
      </Card>

      {groupingType === "transport" && (
        <div className="space-y-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                Segregação de Clientes
              </CardTitle>
              <CardDescription>
                Defina quais clientes devem ser segregados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                  <UploadClientesSegregados />

                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-px bg-border"></div>
                    <span className="text-xs text-muted-foreground">ou</span>
                    <div className="flex-1 h-px bg-border"></div>
                  </div>

                  <div className="flex gap-2">
                <Input
                  placeholder="Digite o código do cliente"
                  value={novoCliente}
                  onChange={(e) => setNovoCliente(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdicionarCliente()}
                  className="h-9"
                />
                <Button onClick={handleAdicionarCliente} size="sm" className="h-9">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {segregatedClients.map((cliente: string) => (
                  <Badge key={cliente} variant="secondary" className="flex items-center gap-1 text-xs">
                    {cliente}
                    <button
                      onClick={() => removeClient(cliente)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
                Agrupamento de Transportes
              </CardTitle>
              <CardDescription>
                Agrupe transportes específicos para impressão
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Nome do grupo"
                  value={novoGrupo}
                  onChange={(e) => setNovoGrupo(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdicionarGrupo()}
                  className="h-9"
                />
                <Button onClick={handleAdicionarGrupo} size="sm" className="h-9">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {transportGroups.map((grupo: any) => (
                  <div key={grupo.id} className="border rounded-lg p-3 bg-muted/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-green-100 rounded">
                          <Package className="w-3 h-3 text-green-600" />
                        </div>
                        <h4 className="font-medium text-sm">{grupo.name || `Grupo ${grupo.id}`}</h4>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeTransportGroup(grupo.id)}
                        className="h-7 w-7 p-0"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="flex gap-2 mb-2">
                      <Input
                        placeholder="Código do transporte"
                        value={grupoSelecionado === grupo.id ? novoTransporte : ""}
                        onChange={(e) => {
                          setNovoTransporte(e.target.value)
                          setGrupoSelecionado(grupo.id)
                        }}
                        onKeyDown={(e) => e.key === "Enter" && handleAdicionarTransporte()}
                        className="h-8 text-sm"
                      />
                      <Button
                        onClick={handleAdicionarTransporte}
                        size="sm"
                        disabled={grupoSelecionado !== grupo.id}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {grupo.items.map((transporte: string) => (
                        <Badge key={transporte} variant="outline" className="flex items-center gap-1 text-xs">
                          {transporte}
                          <button
                            onClick={() => removeTransportFromGroup(grupo.id, transporte)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="w-2 h-2" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {groupingType === "customerCode" && (
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              Agrupamento de Clientes
            </CardTitle>
            <CardDescription>
              Agrupe clientes específicos para impressão
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Nome do grupo"
                value={novoGrupo}
                onChange={(e) => setNovoGrupo(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdicionarGrupoCliente()}
                className="h-9"
              />
              <Button onClick={handleAdicionarGrupoCliente} size="sm" className="h-9">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {clientGroups.map((grupo: any) => (
                <div key={grupo.id} className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-purple-100 rounded">
                        <Users className="w-3 h-3 text-purple-600" />
                      </div>
                      <h4 className="font-medium text-sm">{grupo.name || `Grupo ${grupo.id}`}</h4>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeClientGroup(grupo.id)}
                      className="h-7 w-7 p-0"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex gap-2 mb-2">
                    <Input
                      placeholder="Código do cliente"
                      value={grupoClienteSelecionado === grupo.id ? novoClienteGrupo : ""}
                      onChange={(e) => {
                        setNovoClienteGrupo(e.target.value)
                        setGrupoClienteSelecionado(grupo.id)
                      }}
                      onKeyDown={(e) => e.key === "Enter" && handleAdicionarClienteGrupo()}
                      className="h-8 text-sm"
                    />
                    <Button
                      onClick={handleAdicionarClienteGrupo}
                      size="sm"
                      disabled={grupoClienteSelecionado !== grupo.id}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {grupo.items.map((cliente: string) => (
                      <Badge key={cliente} variant="outline" className="flex items-center gap-1 text-xs">
                        {cliente}
                        <button
                          onClick={() => removeClientFromGroup(grupo.id, cliente)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-2 h-2" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 