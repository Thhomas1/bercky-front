import { supabase } from "@/lib/supa"; // Asumo que acá tenés tu createBrowserClient
import { useQuery } from "@tanstack/react-query";

export const useGetReport = (id: number) => {
  return useQuery({
    queryKey: ["report", id],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (session?.access_token) {
        headers["Authorization"] = `Bearer ${session.access_token}`;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reports/${id}`,
        { headers },
      );

      if (!res.ok) throw new Error("Error al cargar el reporte");

      return res.json();
    },
    enabled: !!id,
  });
};
