"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useGetMyReports } from "@/hooks/useGetMyReports";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { Edit2, X, Check } from "lucide-react";
import { toast } from "sonner";
import type { Report } from "@/types/report";
import { Status } from "@/types/enums";
import { UpdateUser } from "@/types/user";
import { statusStyles } from "@/types/animal";

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetProfile();
  const { data: reports = [], isLoading: isLoadingReports } = useGetMyReports();

  const [isEditing, setIsEditing] = useState(false);

  const updateUserMutation = useUpdateUser(user?.id || 0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUser>({
    defaultValues: {
      name: "",
      lastname: "",
      phonenumber: "",
      zone: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        lastname: user.lastname || "",
        phonenumber: user.phonenumber || "",
        zone: user.zone || "",
      });
    }
  }, [user, reset]);

  useEffect(() => {
    if (isError) {
      router.push("auth/login");
    }
  }, [isError, router]);

  const onSubmit: SubmitHandler<UpdateUser> = async (data) => {
    await updateUserMutation.mutateAsync(data);
    toast.success("¡Perfil actualizado!");
    setIsEditing(false);
  };

  if (isLoading) {
    return <p className="text-muted-foreground p-10">Cargando perfil...</p>;
  }

  if (isError || !user) return null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <h1 className="font-display text-foreground text-3xl">Mi Perfil</h1>

      <div className="border-border bg-card relative mt-6 rounded-xl border p-6 shadow-sm">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80 absolute top-4 right-4 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all"
        >
          {isEditing ? (
            <>
              <X className="h-3.5 w-3.5" /> Cancelar
            </>
          ) : (
            <>
              <Edit2 className="h-3.5 w-3.5" /> Editar
            </>
          )}
        </button>

        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-muted-foreground text-sm">Nombre</label>
                <input
                  type="text"
                  className="bg-background flex h-10 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-zinc-800"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-muted-foreground text-sm">
                  Apellido
                </label>
                <input
                  type="text"
                  className="bg-background flex h-10 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-zinc-800"
                  {...register("lastname", {
                    required: "El apellido es obligatorio",
                  })}
                />
                {errors.lastname && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-muted-foreground text-sm">Email</label>
              <input
                type="text"
                disabled
                value={user.mail}
                className="bg-muted text-muted-foreground flex h-10 w-full cursor-not-allowed rounded-md border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800"
                title="El email no se puede cambiar por acá"
              />
            </div>

            <div>
              <label className="text-muted-foreground text-sm">
                Teléfono (Obligatorio) *
              </label>
              <input
                type="tel"
                placeholder="Ej: 1123456789"
                className="bg-background flex h-10 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-zinc-800"
                {...register("phonenumber", {
                  required:
                    "El teléfono es obligatorio para que puedan contactarte.",
                  maxLength: {
                    value: 13,
                    message:
                      "El teléfono no puede tener tantos numeros! e imposible",
                  },
                  pattern: {
                    value: /^\+?[0-9]{8,13}$/,
                    message:
                      "Ingresá un número válido de Argentina (solo números, ej: 1123456789)",
                  },
                })}
              />
              {errors.phonenumber && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.phonenumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-muted-foreground text-sm">
                Zona habitual
              </label>
              <input
                type="text"
                className="bg-background flex h-10 w-full rounded-md border border-zinc-200 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500/50 focus:outline-none dark:border-zinc-800"
                {...register("zone", { required: "La zona es obligatoria" })}
              />
              {errors.zone && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.zone.message}
                </p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={updateUserMutation.isPending}
                className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-600 disabled:opacity-70"
              >
                {updateUserMutation.isPending ? (
                  <span className="animate-pulse">Guardando...</span>
                ) : (
                  <>
                    <Check className="h-4 w-4" /> Guardar cambios
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 pt-2">
            <div>
              <p className="text-muted-foreground text-sm">Nombre completo</p>
              <p className="text-lg font-medium capitalize">
                {user.name} {user.lastname}
              </p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="text-lg font-medium">{user.mail}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Teléfono</p>
              <p className="text-lg font-medium">{user.phonenumber}</p>
            </div>

            <div>
              <p className="text-muted-foreground text-sm">Zona</p>
              <p className="text-lg font-medium capitalize">{user.zone}</p>
            </div>
          </div>
        )}
      </div>

      <h2 className="font-display text-foreground mt-8 text-2xl">
        Mis Reportes
      </h2>

      <div className="border-border bg-card mt-4 rounded-xl border p-6 shadow-sm">
        {isLoadingReports ? (
          <p className="text-muted-foreground text-sm">Cargando reportes...</p>
        ) : reports.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No tienes reportes creados.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {reports.map((report: Report) => {
              const status = report.istransit
                ? Status.Transito
                : Status.Perdido;

              return (
                <div
                  key={report.id}
                  className="border-border rounded-lg border p-4"
                >
                  <div className="flex items-start justify-between">
                    <p className="text-foreground font-medium">
                      {report.description || "Sin descripción"}
                    </p>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}
                    >
                      {status}
                    </span>
                  </div>
                  {report.spotted && (
                    <p className="text-muted-foreground mt-2 text-sm">
                      Visto en: {report.spotted}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
