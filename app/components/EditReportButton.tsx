// src/components/EditReportButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

export const EditReportButton = ({ reportId }: { reportId: number }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/report/${reportId}/edit`);
  };

  return (
    <button
      onClick={handleEditClick}
      className="flex items-center gap-2 rounded-xl bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-600 transition-all hover:bg-amber-500/20 dark:text-amber-400"
    >
      <Pencil className="h-4 w-4" />
      <span>Editar Reporte</span>
    </button>
  );
};

export default EditReportButton;
