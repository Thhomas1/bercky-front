"use client";

import ReportCard from "@/components/ReportCard";
import Titles from "@/components/Titles";
import { Report } from "@/types/report";
import { useGetReports } from "@/hooks/useGetReports";
import { Shelters } from "@/components/Shelters";
import FAQ from "@/components/FAQ";

export default function Home() {
  const { data: reports, isLoading, isError } = useGetReports();

  if (isLoading) return <p className="p-10 text-muted-foreground">Cargando...</p>;
  if (isError) return <p className="p-10 text-red-400">Error al cargar los reportes.</p>;

  return (
    <main className="px-4 py-6 pb-28 sm:px-6">
      <Titles />
      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {reports?.map((report: Report) => (
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
      <div >
        <Shelters />
      </div>
      <div >
        <FAQ />
      </div>
    </main>
  );
}