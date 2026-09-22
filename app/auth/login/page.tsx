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
import GoogleIcon from "../../../public/icons/googleIcon";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Ingresá un email válido"),
  password: z.string().min(1, "Ingresá tu contraseña"),
});

type LoginValues = z.infer<typeof loginSchema>;


export const Login = () => {
  
  const router = useRouter();
  const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  //@TODO migrate when we finish the SSN


  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  async function onSubmit(values: LoginValues) {
    const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  });

  if (error) {
    console.error("Error de login:", error.message);
    return;
  }
    router.push('/');
  }

  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/report` }
    })
  } 

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full items-center justify-center px-6 py-12 sm:px-10 md:w-1/2 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-3xl text-foreground">Bercky</h1>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Iniciá sesión para ver los reportes en nuestro pueblo
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
              o registrate + rapido
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
            Inicia con Google
          </Button>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            ¿No tenés cuenta?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Registrate
            </Link>
          </p>
        </div>
      </div>
                {/* luego poner un random para poner varios animales en la portada */}
      <div className="relative hidden w-1/2 md:block">
        <Image
          src="/images/login.jpg"
          alt="Mascota reunida con su familia"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to from-background/60 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default Login;