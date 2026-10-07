import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supa";

interface CreateCommentParams {
  content: string;
}

export const useCreateComment = (reportId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ content }: CreateCommentParams) => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!session?.access_token) {
        throw new Error("Debes iniciar sesión para comentar");
      }
      console.log("reportId", reportId);
      const res = await fetch(`${apiUrl}/comments/${reportId}/comments`, {
        method: "POST",
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
