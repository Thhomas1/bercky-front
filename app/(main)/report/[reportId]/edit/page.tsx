// app/reports/[reportId]/edit/page.tsx
"use client";

import { use } from "react";
import { useGetReport } from "@/hooks/useGetReport";
import EditReportForm from "@/components/EditReportForm";

export default function EditReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const resolvedParams = use(params);
  const reportId = Number(resolvedParams.reportId);

  // traemos los datos actuales del reporte para precargar el form
  const { data: report, isLoading, isError } = useGetReport(reportId);

  if (isLoading)
    return (
      <p className="text-muted-foreground p-10 text-center">
        Cargando datos para editar...
      </p>
    );
  if (isError || !report)
    return (
      <p className="p-10 text-center text-red-400">
        No se encontró el reporte.
      </p>
    );

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Editar Reporte #{reportId}</h1>
      <EditReportForm report={report} />
    </main>
  );
}
