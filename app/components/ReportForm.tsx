"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "motion/react";
import { 
  MapPin, Camera, Info, Phone, Send, 
  PawPrint, Tag, Ruler, Calendar, Map 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCreateReport } from "@/hooks/useCreateReport"; // Tu hook ahora debe recibir FormData

type ReportFormValues = {
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

export default function ReportForm() {
  const router = useRouter();
  const createReportMutation = useCreateReport();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportFormValues>({
    defaultValues: {
      status: "perdido",
      animal_type: "perro",
      animal_size: "mediano",
    },
  });

  const onSubmit: SubmitHandler<ReportFormValues> = async (data) => {
    try {
      const formData = new FormData();
      
      // reporte
      formData.append("status", data.status);
      formData.append("istransit", String(data.status === "en transito"));
      formData.append("zonereport", data.zonereport);
      formData.append("spotted", data.spotted);
      formData.append("description", data.description);

      // animal
      formData.append("animal_name", data.animal_name || "desconocido");
      formData.append("animal_type", data.animal_type); 
      formData.append("animal_breed", data.animal_breed || "desconocida");
      formData.append("animal_size", data.animal_size);
      formData.append("animal_age", String(data.animal_age || 1));
      
      //@hardcodeado revisar luego del auth 
      formData.append("user_id", "1");

      if (data.photo && data.photo.length > 0) {
        formData.append("imageFile", data.photo[0]);
      }

      await createReportMutation.mutateAsync(formData); 
      
      router.push("/");
    } catch (error) {
      console.error("Error al publicar el reporte:", error);
    }
  };

  const isSubmitting = createReportMutation.isPending;

  return (
    <main className="flex justify-center px-4 py-12 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-black/5 bg-card p-6 shadow-lg dark:border-white/5 sm:p-8"
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
              ¿Cuál es la situación?
            </label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {(["perdido", "en transito", "encontrado"] as const).map((statusOption) => (
                <label
                  key={statusOption}
                  className="has-[:checked]:bg-blue-500/10 has-[:checked]:text-blue-600 dark:has-[:checked]:text-blue-400 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-background px-4 py-3 text-sm font-medium capitalize transition-all hover:bg-muted has-[:checked]:border-blue-500 dark:border-zinc-800"
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
          </div>

          <hr className="border-black/5 dark:border-white/5" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <PawPrint className="h-4 w-4 text-muted-foreground" />
                Nombre (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: Firulais"
                className="flex h-11 w-full rounded-xl border border-zinc-200 bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-zinc-800"
                {...register("animal_name")}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Tag className="h-4 w-4 text-muted-foreground" />
                Tipo de animal *
              </label>
              <select
                className="flex h-11 w-full rounded-xl border border-zinc-200 bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-zinc-800"
                {...register("animal_type")}
              >
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Info className="h-4 w-4 text-muted-foreground" />
                Raza (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej: Caniche, Mestizo..."
                className="flex h-11 w-full rounded-xl border border-zinc-200 bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-zinc-800"
                {...register("animal_breed")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  Tamaño *
                </label>
                <select
                  className="flex h-11 w-full rounded-xl border border-zinc-200 bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-zinc-800"
                  {...register("animal_size")}
                >
                  <option value="peque">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Edad aprox.
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="Ej: 3"
                  className="flex h-11 w-full rounded-xl border border-zinc-200 bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-zinc-800"
                  {...register("animal_age")}
                />
              </div>
            </div>
          </div>

          <hr className="border-black/5 dark:border-white/5" />

          {/* ================= UBICACIÓN Y DESCRIPCIÓN ================= */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Zona / Barrio (General) *
              </label>
              <input
                type="text"
                placeholder="Ej: Centro de Bernal"
                className="flex h-11 w-full rounded-xl border border-zinc-200 bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-zinc-800"
                {...register("zonereport", { required: "La zona es obligatoria" })}
              />
              {errors.zonereport && <p className="text-xs text-red-500">{errors.zonereport.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Map className="h-4 w-4 text-muted-foreground" />
                Lugar exacto (Calles) *
              </label>
              <input
                type="text"
                placeholder="Ej: 9 de Julio y Belgrano"
                className="flex h-11 w-full rounded-xl border border-zinc-200 bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-zinc-800"
                {...register("spotted", { required: "El lugar exacto es obligatorio" })}
              />
              {errors.spotted && <p className="text-xs text-red-500">{errors.spotted.message}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Info className="h-4 w-4 text-muted-foreground" />
              Descripción extra
            </label>
            <textarea
              rows={3}
              placeholder="Ej: Tiene collar rojo. Es muy asustadizo."
              className="flex w-full resize-none rounded-xl border border-zinc-200 bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:border-zinc-800"
              {...register("description")}
            />
          </div>  
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Camera className="h-4 w-4 text-muted-foreground" />
              Foto del animal (Opcional)
            </label>
            <input
              type="file"
              accept="image/*"
              className="flex w-full cursor-pointer rounded-xl border border-zinc-200 bg-background px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/50 file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-blue-500/10 file:px-4 file:py-1.5 file:text-sm file:font-semibold file:text-blue-600 hover:file:bg-blue-500/20 dark:border-zinc-800"
              {...register("photo")}
            />
          </div>
          
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] hover:bg-blue-600 active:scale-95 disabled:pointer-events-none disabled:opacity-70"
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