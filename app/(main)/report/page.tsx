"use client";

import { ReportCard } from "@/components/ReportCard";
import { useGetReports } from "@/hooks/useGetReports";
import { Report } from "@/types/report";

export const ReportPage = () => {
  const { data: reports, isLoading, isError } = useGetReports();

  if (isLoading)
    return <p className="text-muted-foreground p-10">Cargando...</p>;
  if (isError)
    return <p className="p-10 text-red-400">Error al cargar los reportes.</p>;

  return (
    <main className="px-4 py-6 pb-28 sm:px-6">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {reports?.map((report: Report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </main>
  );
};

export default ReportPage;
