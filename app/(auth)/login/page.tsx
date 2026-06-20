"use client";

import Link from "next/link";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

// Matchea tu LoginDto: { email: string; password: string }
const loginSchema = z.object({
  email: z.string().email("Ingresá un email válido"),
  password: z.string().min(1, "Ingresá tu contraseña"),
});

type LoginValues = z.infer<typeof loginSchema>;

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v2.97h3.86c2.26-2.09 3.56-5.17 3.56-8.79z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-2.97c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.74-4.96H1.27v3.07C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.26 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32V6.62H1.27A11.96 11.96 0 0 0 0 12c0 1.92.46 3.74 1.27 5.38l3.99-3.06z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.18 15.24 0 12 0 7.31 0 3.26 2.7 1.27 6.62l3.99 3.06C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  );
}

export const Login = () => {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginValues) {
    // Acá va el fetch a tu backend Hono, ej:
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    //   method: "POST",
    //   credentials: "include",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(values),
    // });
    console.log(values);
  }

  function handleGoogleLogin() {
    // Redirige al endpoint de OAuth de tu backend Hono.
    // Ese endpoint hace el flujo con Google y al final
    // setea la cookie httpOnly + redirige de vuelta al front.
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Columna izquierda: formulario */}
      <div className="flex w-full items-center justify-center px-6 py-12 sm:px-10 md:w-1/2 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl text-foreground">Bercky</h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Iniciá sesión para ver los reportes cerca de vos.
          </p>

          <form
            id="login-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8"
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      placeholder="tu@email.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="login-password">
                      Contraseña
                    </FieldLabel>
                    <Input
                      {...field}
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>

          <Button
            type="submit"
            form="login-form"
            className="mt-4 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
          </Button>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase text-muted-foreground">
              o continuá con
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleLogin}
          >
            <GoogleIcon />
            Continuar con Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link
              href="/register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Registrate
            </Link>
          </p>
        </div>
      </div>

      {/* Columna derecha: imagen — oculta en mobile */}
      <div className="relative hidden w-1/2 md:block">
        <Image
          src="/images/login.jpg"
          alt="Mascota reunida con su familia"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default Login;