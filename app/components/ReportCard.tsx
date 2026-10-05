"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { Report } from "@/types/report";
import { Status } from "@/types/enums";
import { statusStyles } from "@/types/animal";

export const ReportCard = ({ report }: { report: Report }) => {
  const animalName = `Mascota #${report.animal_id}`;

  const status = report.istransit ? Status.Transito : Status.Perdido;

  const hasValidPhoto = report.photo && report.photo.startsWith("http");

  return (
    <Link href={`/report/${report.id}`} className="block">
      <motion.article
        whileHover={{ y: -6, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className="bg-card overflow-hidden rounded-2xl border border-black/5 shadow-sm dark:border-white/5"
      >
        <div className="bg-muted relative aspect-4/3 w-full sm:aspect-square">
          {hasValidPhoto ? (
            <Image
              src={report.photo as string}
              alt={animalName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm">
              Sin foto
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-foreground text-lg font-semibold">
              {animalName}
            </h3>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}
            >
              {status}
            </span>
          </div>

          <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            <span>{report.zonereport?.trim() || "Zona desconocida"}</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default ReportCard;
