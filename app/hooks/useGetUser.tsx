import { supabase } from "@/lib/supa";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ["user", id],
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
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        { headers },
      );

      if (!res.ok) throw new Error("Error al cargar el usuario");

      return res.json();
    },
    enabled: !!id,
  });
};
