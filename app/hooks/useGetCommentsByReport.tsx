import { useQuery } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";

//@TODO migrate it to utils and use it as an export 
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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