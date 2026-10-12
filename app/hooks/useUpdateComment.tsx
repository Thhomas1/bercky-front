import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supa";

interface UpdateCommentParams {
  id: number;
  content: string;
}

export const useUpdateComment = (reportId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, content }: UpdateCommentParams) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!session?.access_token) {
        throw new Error("Debes iniciar sesión para editar un comentario");
      }

      const res = await fetch(`${apiUrl}/comments/${reportId}/comments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.error ||
            errorData?.message ||
            `Error del servidor: Status ${res.status}`,
        );
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", reportId],
      });
    },
  });
};
