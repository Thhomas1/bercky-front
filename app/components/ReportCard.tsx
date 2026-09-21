"use client";

import { MapPin } from "lucide-react";
import { motion } from "motion/react";
import type { Report, AnimalStatus } from "@/types/report";


const statusStyles: Record<AnimalStatus, string> = {
  perdido: "bg-red-500/10 text-red-600 dark:text-red-400",
  encontrado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "en transito": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

export const ReportCard = ({ report }: { report: Report }) => {
  const animalName = `Mascota #${report.animal_id}`;
  const status = report.istransit ? "en transito" : "perdido";

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 300, damping: 18 }}
      className="overflow-hidden rounded-2xl border border-black/5 bg-card shadow-sm dark:border-white/5"
    >
      <div className="relative aspect-4/3 w-full bg-muted sm:aspect-square">
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Sin foto 
          </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground">
            {animalName}
          </h3>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}
          >
            {report.istransit ? "en transito" : "perdido"}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" strokeWidth={1.75} />
          <span>{ report.zonereport?.trim() || "Zona desconocida"}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default ReportCard;