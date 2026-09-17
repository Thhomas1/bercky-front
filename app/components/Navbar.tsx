"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
      setIsLoading(false);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    // chau sesion en supa y borra la cookie automáticamente
    await supabase.auth.signOut(); 
    
    router.refresh();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-display text-2xl text-foreground sm:text-3xl">
          Bercky
        </Link>
        {!isLoading && (
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Cerrar sesión"
                className="flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
              >
                <LogOut className="h-5 w-5" strokeWidth={1.75} />
              </button>
            ) : (
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