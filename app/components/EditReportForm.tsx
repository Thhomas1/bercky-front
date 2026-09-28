"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";
import {
  MapPin,
  Camera,
  Info,
  Send,
  PawPrint,
  Tag,
  Ruler,
  Calendar,
  Map,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUpdateReport } from "@/hooks/useUpdateReport";
import { toast } from "sonner"; // <--- Importante para los avisos

type EditReportFormValues = {
  id: number;
  status: "perdido" | "encontrado" | "en transito";
  zonereport: string;
  spotted: string;
  description: string;
  animal_name: string;
  animal_type: "perro" | "gato" | "otro";
  animal_breed: string;
  animal_size: "peque" | "mediano" | "grande";
  animal_age: number;
  photo: FileList;
};

export default function EditReportForm({
  report,
}: {
  report: EditReportFormValues;
}) {
  const router = useRouter();
  const updateReportMutation = useUpdateReport(report.id);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<EditReportFormValues>({
    defaultValues: {
      status: report.status,
      zonereport: report.zonereport || "",
      spotted: report.spotted || "",
      description: report.description || "",
      animal_name: report.animal_name || "",
      animal_type: report.animal_type || "perro",
      animal_breed: report.animal_breed || "",
      animal_size: report.animal_size || "mediano",
      animal_age: report.animal_age || 1,
    },
  });

  const onSubmit: SubmitHandler<EditReportFormValues> = async (data) => {
    try {
      const formData = new FormData();

      for (const key of Object.keys(
        dirtyFields,
      ) as (keyof EditReportFormValues)[]) {
        if (key === "status") {
          formData.append("status", data.status);
          formData.append("istransit", String(data.status === "en transito"));
        } else if (key !== "photo") {
          const value = data[key];
          if (value !== undefined && value !== null && value !== "") {
            formData.append(key, String(value));
          }
        }
      }

      if (data.photo && data.photo.length > 0) {
        formData.append("imageFile", data.photo[0]);
      }

      await updateReportMutation.mutateAsync(formData);

      toast.success("¡Reporte actualizado con éxito!");
      router.push(`/report/${report.id}`);
    } catch (error) {
      console.error("Error al actualizar el reporte:", error);
    }
  };

  const isSubmitting = updateReportMutation.isPending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-card w-full overflow-hidden rounded-2xl border border-black/5 p-6 shadow-lg sm:p-8 dark:border-white/5"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <label className="text-foreground text-sm font-semibold">
            ¿Cuál es la situación actual? *
          </label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(["perdido", "en transito", "encontrado"] as const).map(
              (statusOption) => (
                <label
                  key={statusOption}
                  className="bg-background hover:bg-muted flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-3 text-sm font-medium capitalize transition-all has-[:checked]:border-amber-500 has-[:checked]:bg-amber-500/10 has-[:checked]:text-amber-600 dark:border-zinc-800 dark:has-[:checked]:text-amber-400"
                >
                  <input
                    type="radio"
                    value={statusOption}
                    className="sr-only"
                    {...register("status", {
                      required: "Seleccioná una opción",
                    })}
                  />
                  {statusOption}
                </label>
              ),
            )}
          </div>
        </div>

        <hr className="border-black/5 dark:border-white/5" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
              <PawPrint className="text-muted-foreground h-4 w-4" />
              Nombre
            </label>
            <input
              type="text"
              className="bg-background flex h-11 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
              {...register("animal_name")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
              <Tag className="text-muted-foreground h-4 w-4" />
              Tipo de animal *
            </label>
            <select
              className="bg-background flex h-11 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
              {...register("animal_type")}
            >
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
              <Info className="text-muted-foreground h-4 w-4" />
              Raza
            </label>
            <input
              type="text"
              className="bg-background flex h-11 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
              {...register("animal_breed")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                <Ruler className="text-muted-foreground h-4 w-4" />
                Tamaño *
              </label>
              <select
                className="bg-background flex h-11 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
                {...register("animal_size")}
              >
                <option value="peque">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                <Calendar className="text-muted-foreground h-4 w-4" />
                Edad aprox.
              </label>
              <input
                type="number"
                min="0"
                className="bg-background flex h-11 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
                {...register("animal_age")}
              />
            </div>
          </div>
        </div>

        <hr className="border-black/5 dark:border-white/5" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
              <MapPin className="text-muted-foreground h-4 w-4" />
              Zona / Barrio *
            </label>
            <input
              type="text"
              className="bg-background flex h-11 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
              {...register("zonereport", {
                required: "La zona es obligatoria",
              })}
            />
            {errors.zonereport && (
              <p className="text-xs text-red-500">
                {errors.zonereport.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
              <Map className="text-muted-foreground h-4 w-4" />
              Lugar exacto *
            </label>
            <input
              type="text"
              className="bg-background flex h-11 w-full rounded-xl border border-zinc-200 px-4 py-2 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
              {...register("spotted", {
                required: "El lugar exacto es obligatorio",
              })}
            />
            {errors.spotted && (
              <p className="text-xs text-red-500">{errors.spotted.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
            <Info className="text-muted-foreground h-4 w-4" />
            Descripción
          </label>
          <textarea
            rows={3}
            className="bg-background flex w-full resize-none rounded-xl border border-zinc-200 px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
            {...register("description")}
          />
        </div>

        <div className="space-y-2">
          <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
            <Camera className="text-muted-foreground h-4 w-4" />
            Cambiar foto (Opcional)
          </label>
          <input
            type="file"
            accept="image/*"
            className="bg-background text-muted-foreground flex w-full cursor-pointer rounded-xl border border-zinc-200 px-3 py-2 text-sm file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-amber-500/10 file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-amber-600 hover:file:bg-amber-500/20 focus:ring-2 focus:ring-amber-500/50 focus:outline-none dark:border-zinc-800"
            {...register("photo")}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-background text-foreground hover:bg-muted flex-1 rounded-xl border border-zinc-200 px-6 py-3.5 text-sm font-semibold transition-all dark:border-zinc-800"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-400 active:scale-95 disabled:pointer-events-none disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="animate-pulse">Guardando cambios...</span>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Guardar Cambios</span>
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
