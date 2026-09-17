"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button"; // Asumo que tenés este componente por tu archivo de Login

export const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Para que no parpadee la UI mientras verifica

  // Inicializamos Supabase
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // 1. Buscamos la sesión actual apenas carga el componente
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsLoading(false);
    };
    checkUser();

    // 2. Nos suscribimos a cualquier cambio (ej: si se loguea en otra pestaña o se le vence la sesión)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    // Chau sesión en Supabase y borra la cookie automáticamente
    await supabase.auth.signOut(); 
    
    // Forzamos una recarga y lo mandamos al inicio (o al login si preferís)
    router.refresh();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-2xl text-foreground sm:text-3xl">
          Bercky
        </Link>

        {/* Mientras carga, no mostramos nada para evitar el parpadeo visual */}
        {!isLoading && (
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              // Vista de usuario LOGUEADO
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
                className="flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
              >
                <LogOut className="h-5 w-5" strokeWidth={1.75} />
              </button>
            ) : (
              // Vista de usuario VISITANTE
              <div className="flex items-center gap-3">
                <Link href="auth/login">
                  <Button variant="ghost" className="text-muted-foreground">
                    Ingresar
                  </Button>
                </Link>
                <Link href="auth/register">
                  <Button>Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;