import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBrowserClient } from "@supabase/ssr";

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type CreateReportPayload = {
  status: "perdido" | "en transito" | "encontrado";
  zonereport: string;
  description: string;
  contact: string;
  photo?: FileList; 
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReport: CreateReportPayload) => {
      // Obtenemos la sesión para sacar el ID del usuario
      const { data: { session } } = await supabase.auth.getSession();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) throw new Error("Falta definir NEXT_PUBLIC_API_URL");

      const formData = new FormData();
      
      // 1. Campos base del form
      formData.append("status", newReport.status);
      formData.append("zonereport", newReport.zonereport);
      formData.append("contact", newReport.contact);
      formData.append("istransit", String(newReport.status === "en transito"));
      formData.append("description", newReport.description || "");
      formData.append("spotted", "false"); //@TODO use it


      // Metemos el ID del usuario que está logueado
      // if (session?.user?.id) {
      //   formData.append("user_id", session.user.id);
      // } else {
        //@TODO hardcodeado, cambiar
        formData.append("user_id", "1"); 
      // }

      // IMPORTANTE: Como el form del reporte por ahora no crea un animal, 
      // le paso el ID "1" (como probaste en Postman) para que no rompa la BD. 
      // Luego podés ajustar esta lógica.
      //@TODO hardcodeado, cambiar
      formData.append("animal_id", "1"); 
      if (newReport.photo && newReport.photo.length > 0) {
        formData.append("imageFile", newReport.photo[0]);
      }

      const res = await fetch(`${apiUrl}/reports`, {
        method: "POST",
        headers: {
          // el FormData se encarga
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
    },
  });
};