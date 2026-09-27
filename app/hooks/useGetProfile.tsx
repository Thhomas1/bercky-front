import { supabase } from "@/lib/supa";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if (!res.ok) throw new Error("Error al cargar el perfil");
      return res.json();
    },
  });
};
