"use client";

import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { useGetProfile } from "@/hooks/useGetProfile";

interface EditButtonProps {
  reportId: number;
  ownerId: number;
}

export const EditReportButton = ({ reportId, ownerId }: EditButtonProps) => {
  const router = useRouter();
  const { data: currentUser, isLoading } = useGetProfile();

  if (isLoading || !currentUser || currentUser.id !== ownerId) return null;

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
