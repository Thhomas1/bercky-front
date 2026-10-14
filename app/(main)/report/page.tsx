"use client";

import { useState } from "react";
import { ReportCard } from "@/components/ReportCard";
import { useGetReports } from "@/hooks/useGetReports";
import { Report } from "@/types/report";
import { Status } from "@/types/enums";

const filters: { label: string; value: Status | null }[] = [
  { label: "Todos", value: null },
  { label: "Perdidos", value: Status.Perdido },
  { label: "En tránsito", value: Status.Transito },
  { label: "Encontrados", value: Status.Encontrado },
];

export const ReportPage = () => {
  const { data: reports, isLoading, isError } = useGetReports();
  const [filter, setFilter] = useState<Status | null>(null);

  if (isLoading)
    return <p className="text-muted-foreground p-10">Cargando...</p>;
  if (isError)
    return <p className="p-10 text-red-400">Error al cargar los reportes.</p>;

  const visibleReports = filter
    ? reports?.filter((report: Report) => report.status === filter)
    : reports;

  return (
    <main className="px-4 py-6 pb-28 sm:px-6">
      <div className="mx-auto mb-6 flex max-w-4xl flex-wrap gap-2">
        {filters.map(({ label, value }) => (
          <button
            key={label}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === value
                ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "text-muted-foreground hover:bg-muted border-zinc-200 dark:border-zinc-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {visibleReports?.map((report: Report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
      {visibleReports?.length === 0 && (
        <p className="text-muted-foreground text-center text-sm">
          No hay reportes en esta categoría.
        </p>
      )}
    </main>
  );
};

export default ReportPage;
