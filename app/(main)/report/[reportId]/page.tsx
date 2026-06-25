"use client";

import Image from "next/image";
import { MapPin, Clock, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { mockReportDetail, mockComments } from "@/lib/mocks";
import type { AnimalStatus } from "@/types/report";
import type { Comment } from "@/types/comment";
import Map from "@/components/Map";

const statusStyles: Record<AnimalStatus, string> = {
  perdido: "bg-red-500/10 text-red-600 dark:text-red-400",
  encontrado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "en transito": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

function CommentRow({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
        {comment.author.name.charAt(0).toUpperCase()}
      </div>

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-foreground">
            {comment.author.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {comment.timeAgo}
          </span>
        </div>
        <p className="mt-0.5 text-sm text-foreground/90">{comment.content}</p>

        {comment.lat !== null && comment.lng !== null && (
          <div className="mt-2 max-w-xs">
            <Map
              lat={comment.lat}
              lng={comment.lng}
              label={`Avistamiento de ${comment.author.name}`}
              height="h-32"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export const ReportPreview = () => {
  const report = mockReportDetail;

  return (
    <main className="mx-auto max-w-2xl px-0 py-0 pb-28 sm:px-6 sm:py-8">
      <div className="aspect-square w-full bg-muted sm:aspect-4/3 sm:overflow-hidden sm:rounded-2xl">
        {report.imageUrl ? (
          <Image
            src={report.imageUrl}
            alt={report.animalName}
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
              {report.animalName}
            </h1>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" strokeWidth={1.75} />
              <span>{report.zone}</span>
              <span className="text-muted-foreground/50">·</span>
              <Clock className="h-4 w-4" strokeWidth={1.75} />
              <span>{report.timeAgo}</span>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium capitalize ${statusStyles[report.status]}`}
          >
            {report.status}
          </span>
        </div>

        <p className="mt-4 text-base leading-relaxed text-foreground/90">
          {report.description}
        </p>

        {/* Mapa de última ubicación vista */}
        <div className="mt-5">
          <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
            Última ubicación reportada
          </h2>
          <Map lat={report.lat} lng={report.lng} label={report.animalName} />
        </div>

        <Separator className="my-6" />

        {/* Comentarios / avistamientos */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-muted-foreground" strokeWidth={1.75} />
            <h2 className="text-base font-semibold text-foreground">
              Avistamientos y comentarios
            </h2>
          </div>

          <div className="flex flex-col gap-5">
            {mockComments.map((comment) => (
              <CommentRow key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportPreview;