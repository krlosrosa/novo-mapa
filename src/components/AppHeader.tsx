"use client";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Truck } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface AppHeaderProps {
  title?: string;
  subtitle?: string;
}

export const AppHeader = ({ title, subtitle }: AppHeaderProps) => {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();

  // Não renderiza o header na página de login
  if (pathname.startsWith("/login")) return null;

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            {/* Ícone de logística */}
            <span
              className="rounded-lg bg-primary p-1 flex items-center justify-center"
              aria-label="Ícone de logística"
              tabIndex={0}
            >
              <Truck className="w-10 h-10 p-2 text-white" />
            </span>
            <div>
              <h1 className="text-xl font-semibold text-foreground">{title || "Mapa"}</h1>
              <p className="text-sm text-muted-foreground">{subtitle || "Sistema de impressão de mapa"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {user.name}
              </span>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/login" })}
              aria-label="Deslogar"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader; 