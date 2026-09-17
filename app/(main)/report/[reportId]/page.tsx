"use client";

import Image from "next/image";
import { MapPin, Clock, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/types/comment";
import Map from "@/components/Map";
import { useGetReport } from "@/hooks/useGetReport";

const statusStyles: Record<string, string> = {
  perdido: "bg-red-500/10 text-red-600 dark:text-red-400",
  encontrado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "en transito": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

function CommentRow({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
        {comment.user_id}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-muted-foreground">
            {new Date(comment.createdat).toLocaleDateString("es-AR")}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-foreground/90">{comment.content}</p>
        {comment.photo && (
          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-lg">
            <Image src={comment.photo} alt="foto del comentario" fill className="object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}

export const ReportPreview = ({ id }: { id: number }) => {
  const { data: report, isLoading, isError } = useGetReport(1);
  console.log("data", report, "id", id)

  if (isLoading) return <p className="p-10 text-muted-foreground">Cargando...</p>;
  if (isError || !report) return <p className="p-10 text-red-400">Error al cargar el reporte.</p>;

  return (
    <main className="mx-auto max-w-2xl px-0 py-0 pb-28 sm:px-6 sm:py-8">
      <div className="aspect-square w-full bg-muted sm:aspect-4/3 sm:overflow-hidden sm:rounded-2xl">
        {report.photo ? (
          <Image
            src={report.photo}
            alt={report.animal.name}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Sin foto
          </div>
        )}
      </div>

      <div className="px-4 sm:px-0">
        <div className="flex items-start justify-between gap-3 pt-4">
          <div>
            <h1 className="font-display text-2xl text-foreground sm:text-3xl">
              {report.animal.name}
            </h1>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" strokeWidth={1.75} />
              <span>{report.zonereport}</span>
              <span className="text-muted-foreground/50">·</span>
              <Clock className="h-4 w-4" strokeWidth={1.75} />
              <span>{new Date(report.createdat).toLocaleDateString("es-AR")}</span>
            </div>
          </div>

          <span className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium capitalize ${statusStyles[report.animal.status]}`}>
            {report.animal.status}
          </span>
        </div>

        <p className="mt-4 text-base leading-relaxed text-foreground/90">
          {report.description}
        </p>

        <div className="mt-5">
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
            Última ubicación reportada
          </h2>
          <Map lat={0} lng={0} label={report.animal.name} />
        </div>

        <Separator className="my-6" />

        <div>
          <div className="mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
            <h2 className="text-base font-semibold text-foreground">
              Avistamientos y comentarios
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">Próximamente.</p>
        </div>
      </div>
    </main>
  );
};

export default ReportPreview;