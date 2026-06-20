"use client";

import Link from "next/link";

export const Register = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* Columna izquierda: formulario */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 md:w-1/2 lg:px-20">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="font-display text-3xl text-foreground">
            Bercky
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Creá tu cuenta y empezá a ayudar a reunir familias con sus mascotas.
          </p>

          <form className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Tu nombre"
                className="rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="tu@email.com"
                className="rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              className="mt-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Crear cuenta
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿Ya tenés cuenta?{" "}
            <Link href="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>

      {/* Columna derecha: imagen — oculta en mobile */}
      <div className="relative hidden w-1/2 md:block">
        <img
          src="/auth/register-side.jpg"
          alt="Mascota reunida con su familia"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default Register;