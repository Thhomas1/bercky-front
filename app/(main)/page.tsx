"use client";

import ReportCard, { mockReports } from "@/components/ReportCard";
import Titles from "@/components/Titles";
// import { useGetReports } from "@/hooks/useGetReports";
// 

export default function Home() {
  // const { data: reports, isLoading, isError } = useGetReports();

  return (
    <main className="px-4 py-6 pb-28 sm:px-6">
      <Titles />

      {  (
        <div className="flex justify-center py-20 text-muted-foreground">
          Cargando reportes...
        </div>
      )}

      { (
        <div className="flex justify-center py-20 text-red-400">
          No se pudieron cargar los reportes.
        </div>
      )}

      { (
        <div className="mx-auto max-w-4xl grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 cursor-pointer">
          {mockReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </main>
  );
}