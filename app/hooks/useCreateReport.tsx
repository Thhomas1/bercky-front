import { supabase } from "@/lib/supa";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export type CreateReportPayload = {
  status: "perdido" | "en transito" | "encontrado";
  zonereport: string;
  description: string;
  contact: string;
  photoUrl?: string; 
};

export const useCreateReport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newReport: CreateReportPayload) => {
      // 1. Obtenemos sesión
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) console.error("Error obteniendo la sesión de Supabase:", sessionError);
      

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log("URL de la API configurada:", apiUrl);

      if (!apiUrl) {
        throw new Error("Falta definir NEXT_PUBLIC_API_URL en las variables de entorno (.env)");
      }

      const payload = {
        status: newReport.status,
        zonereport: newReport.zonereport || "",
        contact: newReport.contact || "",
        istransit: newReport.status === "en transito",
        description: newReport.description || "",
        photo: newReport.photoUrl || null,
      };

      console.log("URL final del fetch:", `${apiUrl}/reports`);
      console.log("Payload limpio a enviar:", payload);
      console.log("Token presente:", !!session?.access_token);

      // 2. Ejecutamos el fetch
      const res = await fetch(`${apiUrl}/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null); 
        console.error("Detalle del error del backend:", errorData);
        
        throw new Error(
          errorData?.error || errorData?.message || `Error del servidor: Status ${res.status}`
        );
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
    },
  });
};