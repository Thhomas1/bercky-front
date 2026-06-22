"use client";

import { LogOut } from "lucide-react";

export const Navbar = () => {

  const handleLogout = () => {
    // TODO: lógica real de logout (limpiar cookie/JWT vía endpoint del backend,
    // ej: await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    //   method: "POST",
    //   credentials: "include",
    // }); y después redirigir a /login)
    console.log("logout");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex  items-center justify-between px-4 py-4 sm:px-6">
        <h2 className="font-display text-2xl text-foreground sm:text-3xl">
          Bercky
        </h2>
        <button
          type="button"
          onClick={handleLogout}
          aria-label="Cerrar sesión"
          className="flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <LogOut className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;