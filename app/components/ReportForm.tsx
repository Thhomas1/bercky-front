"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";
import { MapPin, Camera, Info, Phone, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { CreateReportPayload, useCreateReport } from "@/hooks/useCreateReport";

export default function ReportForm() {
  const router = useRouter();
  const createReportMutation = useCreateReport();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReportPayload>({
    defaultValues: {
      status: "perdido",
    },
  });

  const onSubmit: SubmitHandler<CreateReportPayload> = async (data) => {
    try {
      
      await createReportMutation.mutateAsync(data);
      router.push("/");
    } catch (error) {
      console.error("Error al crear el reporte", error);
    }
  };

  const isSubmitting = createReportMutation.isPending;

  return (
    <main className="px-4 py-12 pb-28 sm:px-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-black/5 bg-card shadow-lg dark:border-white/5 p-6 sm:p-8"
      >
        <div className="mb-8 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Crear un nuevo reporte
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Completá los datos para que la comunidad pueda ayudarte.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">
              ¿Cuál es la situación? *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["perdido", "en transito", "encontrado"] as const).map((statusOption) => (
                <label
                  key={statusOption}
                  className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background px-4 py-3 text-sm font-medium transition-all hover:bg-muted has-[:checked]:border-blue-500 has-[:checked]:bg-blue-500/10 has-[:checked]:text-blue-600 dark:has-[:checked]:text-blue-400 capitalize"
                >
                  <input
                    type="radio"
                    value={statusOption}
                    className="sr-only"
                    {...register("status", { required: "Seleccioná una opción" })}
                  />
                  {statusOption}
                </label>
              ))}
            </div>
            {errors.status && (
              <p className="text-xs text-red-500">{errors.status.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              Zona / Barrio *
            </label>
            <input
              type="text"
              placeholder="Ej: Centro de Bernal, cerca de la estación..."
              className="flex h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              {...register("zonereport", { required: "La zona es obligatoria" })}
            />
            {errors.zonereport && (
              <p className="text-xs text-red-500">{errors.zonereport.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Info className="h-4 w-4 text-muted-foreground" />
              Descripción
            </label>
            <textarea
              rows={4}
              placeholder="Ej: Perrito mestizo, tamaño mediano, collar rojo. Es muy asustadizo."
              className="flex w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
              {...register("description")}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              Contacto *
            </label>
            <input
              type="text"
              placeholder="Tu número de teléfono o red social"
              className="flex h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              {...register("contact", { required: "Dejá un medio de contacto" })}
            />
            {errors.contact && (
              <p className="text-xs text-red-500">{errors.contact.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Camera className="h-4 w-4 text-muted-foreground" />
              URL de la Foto (Opcional)
            </label>
            <input
              type="url"
              placeholder="https://..."
              className="flex h-11 w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              {...register("photoUrl")}
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-400 hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Publicando reporte...</span>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Publicar Reporte</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </main>
  );
}