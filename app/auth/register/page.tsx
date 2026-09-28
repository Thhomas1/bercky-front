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
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supa";

const registerSchema = z.object({
  name: z.string().min(2, "Ingresá tu nombre completo"),
  email: z.string().email("Ingresá un email válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type RegisterValues = z.infer<typeof registerSchema>;
//@TODO export this from types

export const Register = () => {
  const router = useRouter();

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: RegisterValues) => {
    const { data, error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.name,
        },
      },
    });

    if (error) {
      console.error("Error al registrar:", error.message);
      form.setError("root", {
        type: "manual",
        message:
          error.message === "User already registered"
            ? "Este email ya está en uso"
            : "Ocurrió un error al crear la cuenta",
      });
      return;
    }

    router.refresh();
    router.push("/");
  };

  async function handleGoogleSignup() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/report`,
      },
    });
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-full items-center justify-center px-6 py-12 sm:px-10 md:w-1/2 md:px-12 lg:px-16">
        <div className="w-full max-w-md">
          <h1 className="font-display text-foreground text-3xl">Bercky</h1>
          <p className="text-muted-foreground mt-2 max-w-xs text-sm leading-relaxed">
            Creá tu cuenta y empezá a ayudar a reunir familias con sus mascotas.
          </p>

          <form
            id="register-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-8"
          >
            <FieldGroup>
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-name">Nombre</FieldLabel>
                    <Input
                      {...field}
                      id="register-name"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="register-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="register-email"
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
                    <FieldLabel htmlFor="register-password">
                      Contraseña
                    </FieldLabel>
                    <Input
                      {...field}
                      id="register-password"
                      type="password"
                      autoComplete="new-password"
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
            form="register-form"
            className="mt-4 w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
          <div className="my-5 flex items-center gap-3">
            <span className="bg-border h-px flex-1" />
            <span className="bg-border h-px flex-1" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full gap-2"
            onClick={handleGoogleSignup}
          >
            <GoogleIcon />
            Registrate con Google
          </Button>
          <p className="text-muted-foreground mt-6 text-center text-sm">
            ¿Ya tenés cuenta?{" "}
            <Link
              href="/auth/login"
              className="text-foreground font-medium underline-offset-4 hover:underline"
            >
              Iniciá sesión
            </Link>
          </p>
        </div>
      </div>
      <div className="relative hidden w-1/2 md:block">
        <Image
          src="/images/login.jpg"
          alt="Mascota reunida con su familia"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="bg-gradient-to from-background/60 absolute inset-0 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export default Register;
