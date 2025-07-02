'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  CheckCircle, 
  Settings, 
  Printer, 
  MapPin,
  Play,
  BookOpen,
  ArrowRight,
  BarChart3,
  Shield,
  Users,
  Zap,
  FileText,
  Truck
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();

  const handleUseSystem = () => {
    router.push('/upload');
  };

  const handleOpenDocs = () => {
    alert('Documentação em desenvolvimento. Em breve você terá acesso ao guia completo do sistema.');
  };

  const features = [
    {
      title: "1. Upload de Arquivos",
      description: "Carregue seus arquivos Excel com dados de remessas, produtos e roteirização",
      icon: Upload,
      color: "text-blue-600"
    },
    {
      title: "2. Validação Automática",
      description: "O sistema verifica automaticamente a integridade e consistência dos dados",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "3. Configuração",
      description: "Configure parâmetros de agrupamento e impressão conforme suas necessidades",
      icon: Settings,
      color: "text-purple-600"
    },
    {
      title: "4. Geração de Mapas",
      description: "Gere mapas de carregamento profissionais e bem estruturados",
      icon: Printer,
      color: "text-orange-600"
    }
  ];

  const benefits = [
    {
      title: "Eficiência Operacional",
      description: "Reduza tempo de processamento em até 80%",
      icon: BarChart3,
      color: "text-emerald-600"
    },
    {
      title: "Precisão Garantida",
      description: "Elimine erros manuais com validação automática",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      title: "Facilidade de Uso",
      description: "Interface intuitiva que não requer treinamento complexo",
      icon: Users,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Mapa de Separação/Carregamento
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            Sistema para geração, organização e impressão de mapas de separação e carregamento.<br />
          </p>
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleUseSystem}
              size="lg"
              className="px-8 py-3 text-lg font-medium"
            >
              <Play className="h-5 w-5 mr-2" />
              Começar Agora
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              onClick={handleOpenDocs}
              variant="outline"
              size="lg"
              className="px-8 py-3 text-lg font-medium"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Documentação
            </Button>
          </div>
        </div>

        {/* Features Stepper */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Como funciona o sistema?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-0">
              Um processo simples e intuitivo em apenas 4 passos
            </p>
          </div>
          {/* Mobile: grid, Desktop: flex-row with arrows */}
          <div className="grid grid-cols-1 gap-4 lg:flex lg:flex-row lg:items-center lg:justify-center lg:gap-0">
            {features.map((feature, index) => (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center flex-1 min-w-[200px] max-w-xs mx-auto">
                  {/* Step Number */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-base font-bold mb-1 shadow-sm">
                    {index + 1}
                  </div>
                  <Card className="border border-border shadow-sm w-full flex-1 flex flex-col items-center px-3 pt-1 pb-4">
                    {/* Title with icon */}
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <feature.icon className={`h-4 w-4 ${feature.color}`} />
                      <span className="text-base font-semibold text-primary text-center">{feature.title.replace(/^\d+\. /, "")}</span>
                    </div>
                    <CardContent className="p-0">
                      <CardDescription className="text-sm text-muted-foreground text-center">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
                {/* Arrow connector (only desktop) */}
                {index < features.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center px-2">
                    <ArrowRight className="h-5 w-5 text-border" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          {/* Mobile flow indicator */}
          <div className="lg:hidden mt-4">
            <div className="flex justify-center items-center space-x-2">
              {features.map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {index < features.length - 1 && (
                    <div className="w-8 h-px bg-border mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2025 Sistema de Mapa de Separação/Carregamento.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
