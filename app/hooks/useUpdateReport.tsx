// src/hooks/useUpdateReport.tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supa";



export const useUpdateReport = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data: { session } } = await supabase.auth.getSession();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) throw new Error("Falta definir NEXT_PUBLIC_API_URL");

      const res = await fetch(`${apiUrl}/reports/${id}`, {
        method: "PATCH", 
        headers: {
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: formData, 
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null); 
        throw new Error(errorData?.error || errorData?.message || `Error del servidor: Status ${res.status}`);
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      queryClient.invalidateQueries({ queryKey: ["report", id] });
    },
  });
};