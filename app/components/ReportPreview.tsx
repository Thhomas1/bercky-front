"use client";

import Image from "next/image";
import { MapPin, Clock, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/types/comment";
import Map from "@/components/Map";
import { useGetReport } from "@/hooks/useGetReport";
import { useGetCommentsByReport } from "@/hooks/useGetCommentsByReport";
import { EditReportButton } from "./EditReportButton";

const statusStyles: Record<string, string> = {
  perdido: "bg-red-500/10 text-red-600 dark:text-red-400",
  encontrado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "en transito": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

const CommentRow = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex gap-3">
      <div className="bg-muted text-muted-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
        {comment.user.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-foreground text-sm font-medium">
            {comment.user.name}
          </span>
          <span className="text-muted-foreground text-xs">
            {new Date(comment.createdat).toLocaleDateString("es-AR")}
          </span>
        </div>
        <p className="text-foreground/90 mt-0.5 text-sm">{comment.content}</p>
        {comment.photo && (
          <div className="relative mt-2 h-32 w-32 overflow-hidden rounded-lg">
            <Image
              src={comment.photo}
              alt="foto del comentario"
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="bg-muted/50 rounded-lg border border-black/5 p-3 dark:border-white/5">
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="text-foreground mt-0.5 text-sm font-medium capitalize">
        {value}
      </p>
    </div>
  );
};

export const ReportPreview = ({ id }: { id: number }) => {
  const { data: report, isLoading, isError } = useGetReport(id);
  const { data: comments, isLoading: isLoadingComments } =
    useGetCommentsByReport(id);

  if (isLoading)
    return <p className="text-muted-foreground p-10">Cargando...</p>;
  if (isError || !report)
    return <p className="p-10 text-red-400">Error al cargar el reporte.</p>;

  return (
    <main className="mx-auto max-w-2xl px-0 py-0 pb-28 sm:px-6 sm:py-8">
      <div className="bg-muted relative aspect-square w-full sm:aspect-4/3 sm:overflow-hidden sm:rounded-2xl">
        {report.photo ? (
          <Image
            src={report.photo}
            alt={report.animal?.name || "Foto del reporte"}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm">
            Sin foto
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4">
        <EditReportButton reportId={report.id} />
      </div>

      <div className="px-4 sm:px-0">
        <div className="flex items-start justify-between gap-3 pt-4">
          <div>
            <h1 className="font-display text-foreground text-2xl sm:text-3xl">
              {report.animal?.name || "Sin nombre"}
            </h1>
            <div className="text-muted-foreground mt-1 flex items-center gap-1.5 text-sm">
              <MapPin className="h-4 w-4" strokeWidth={1.75} />
              <span>{report.zonereport}</span>
              <span className="text-muted-foreground/50">·</span>
              <Clock className="h-4 w-4" strokeWidth={1.75} />
              <span>
                {new Date(report.createdat).toLocaleDateString("es-AR")}
              </span>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium capitalize ${statusStyles[report.animal?.status || "perdido"]}`}
          >
            {report.animal?.status || report.istransit
              ? "en transito"
              : "perdido"}
          </span>
        </div>

        <p className="text-foreground/90 mt-4 text-base leading-relaxed">
          {report.description}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <DetailItem label="Raza" value={report.animal?.breed || "-"} />
          <DetailItem label="Tamaño" value={report.animal?.size || "-"} />
          <DetailItem label="Tipo" value={report.animal?.type || "-"} />
          <DetailItem
            label="Edad"
            value={report.animal?.age ? `${report.animal.age} años` : "-"}
          />
        </div>

        <div className="mt-5">
          <h2 className="text-muted-foreground mb-2 text-sm font-semibold">
            Última ubicación reportada
          </h2>
          <Map lat={0} lng={0} label={report.animal?.name || "Ubicación"} />
        </div>

        <Separator className="my-6" />

        <div>
          <div className="mb-4 flex items-center gap-2">
            <MessageCircle
              className="text-muted-foreground h-5 w-5"
              strokeWidth={1.75}
            />
            <h2 className="text-foreground text-base font-semibold">
              Avistamientos y comentarios
            </h2>
          </div>
          {isLoadingComments ? (
            <p className="text-muted-foreground text-sm">Cargando...</p>
          ) : comments && comments.length > 0 ? (
            <div className="flex flex-col gap-4">
              {comments.map((comment: Comment) => (
                <CommentRow key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">
              Todavía no hay comentarios.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ReportPreview;
