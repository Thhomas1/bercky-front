import { supabase } from "@/lib/supa";
import { useQuery } from "@tanstack/react-query";

export const useGetReport = (id: number) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/${id}`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if (!res.ok) throw new Error("Error al cargar el reporte");
      return res.json();
    },
    enabled: !!id,
  });
};