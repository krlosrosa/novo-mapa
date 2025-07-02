'use client'
import { convertFileToRouting } from "@/features/mapa/convert/convertFileToRouting";
import { useRoutingStore } from "@/features/mapa/store/routingStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useRef } from "react";

export default function UploadRouting() {
  const { dataRouting, setDataRouting } = useRoutingStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await convertFileToRouting(file);
        setDataRouting(data);
      } catch (err) {
        setError('Erro ao processar arquivo. Verifique se o formato está correto.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls'))) {
      setIsLoading(true);
      setError(null);
      try {
        const data = await convertFileToRouting(file);
        setDataRouting(data);
      } catch (err) {
        setError('Erro ao processar arquivo. Verifique se o formato está correto.');
      } finally {
        setIsLoading(false);
      }
    } else {
      setError('Por favor, selecione um arquivo Excel (.xlsx ou .xls)');
    }
  };

  return (
    <div className="space-y-4">
      {/* Status */}
      {dataRouting && dataRouting.length > 0 && (
        <>
          <div className="flex flex-col items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Arquivo carregado com sucesso
              </span>
              <Badge variant="secondary" className="ml-auto">
                {dataRouting.length} registros
              </Badge>
            </div>
            <div className="flex w-full justify-center mt-2">
              <Button
                variant="ghost"
                className="hover:bg-blue-400 w-full"
                size="sm"
                onClick={() => setDataRouting([])}
                type="button"
                aria-label="Trocar arquivo de roteirização"
              >
                Trocar arquivo
              </Button>
            </div>
          </div>
        </>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <span className="text-sm text-red-800">{error}</span>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dataRouting && dataRouting.length > 0
          ? 'border-green-300 bg-green-50'
          : 'border-border hover:border-primary/50 hover:bg-muted/50'
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="space-y-3">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : dataRouting && dataRouting.length > 0 ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : (
              <Upload className="h-6 w-6 text-primary" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {isLoading
                ? 'Processando arquivo...'
                : dataRouting && dataRouting.length > 0
                  ? 'Arquivo processado'
                  : 'Arraste e solte o arquivo aqui'
              }
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ou clique para selecionar
            </p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="hidden"
            disabled={isLoading}
            tabIndex={-1}
          />
          {(!dataRouting || dataRouting.length === 0) && !isLoading && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => inputRef.current && inputRef.current.click()}
                className="mt-2"
                type="button"
                aria-label="Selecionar arquivo de roteirização"
              >
                <FileText className="h-4 w-4 mr-2" />
                Selecionar Arquivo
              </Button>
              <label htmlFor="routing-upload-fallback" className="sr-only">Selecionar Arquivo</label>
              <input
                id="routing-upload-fallback"
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                disabled={isLoading}
                tabIndex={-1}
              />
            </>
          )}
        </div>
      </div>
      {/* File Info */}
      {dataRouting && dataRouting.length > 0 && (
        <div className="text-xs text-muted-foreground text-center">
          <p>Formato aceito: .xlsx, .xls</p>
          <p>Dados de roteirização processados</p>
        </div>
      )}
    </div>
  );
}