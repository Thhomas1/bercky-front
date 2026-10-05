import { supabase } from "@/lib/supa";
import { UpdateUser } from "@/types/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateUser = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateUser) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(data),
        },
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || "Error al actualizar el perfil");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    },
  });
};
