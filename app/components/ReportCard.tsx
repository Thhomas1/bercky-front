"use client";

import { MapPin, Clock } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import type { Report, AnimalStatus } from "@/types/report";

export const mockReports: Report[] = [
  {
    id: 1,
    animalName: "Toby",
    status: "perdido",
    zone: "Quilmes Centro",
    timeAgo: "hace 2 horas",
    imageUrl: null,
  },
  {
    id: 2,
    animalName: "Luna",
    status: "encontrado",
    zone: "Bernal",
    timeAgo: "hace 5 horas",
    imageUrl: null,
  },
  {
    id: 3,
    animalName: "Rocky",
    status: "perdido",
    zone: "Ezpeleta",
    timeAgo: "hace 1 día",
    imageUrl: null,
  },
  {
    id: 4,
    animalName: "Mía",
    status: "en transito",
    zone: "Don Bosco",
    timeAgo: "hace 2 días",
    imageUrl: null,
  },
];

const statusStyles: Record<AnimalStatus, string> = {
  perdido: "bg-red-500/10 text-red-600 dark:text-red-400",
  encontrado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "en transito": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

interface ReportCardProps {
  report: Report;
}

export const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="overflow-hidden rounded-2xl border border-black/5 bg-card shadow-sm dark:border-white/5"
    >
      <div className="aspect-4/3 w-full bg-muted sm:aspect-square">
        {report.imageUrl ? (
          <Image
            src={report.imageUrl}
            alt={report.animalName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Sin foto
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            {report.animalName}
          </h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[report.status]}`}
          >
            {report.status}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" strokeWidth={1.75} />
          <span>{report.zone}</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" strokeWidth={1.75} />
          <span>{report.timeAgo}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default ReportCard;