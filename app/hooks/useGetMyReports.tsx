import { supabase } from "@/lib/supa";
import { useQuery } from "@tanstack/react-query";
import type { Report } from "@/types/report";

export const useGetMyReports = () => {
  return useQuery({
    queryKey: ["my-reports"],
    queryFn: async (): Promise<Report[]> => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile/reports`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Error al cargar los reportes del usuario");
      return res.json();
    },
  });
};
