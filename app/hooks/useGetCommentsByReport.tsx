import { supabase } from "@/lib/supa";
import { useQuery } from "@tanstack/react-query";


export const useGetCommentsByReport = (reportId: number) => {
  return useQuery({
    queryKey: ["comments", reportId],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${reportId}/comments`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if (!res.ok) throw new Error("Error al cargar los comentarios");
      return res.json();
    },
    enabled: !!reportId,
  });
};