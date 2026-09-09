import { useQuery } from "@tanstack/react-query";

export const useGetReports = () => {
  return useQuery({
  queryKey: ["reports"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports`);
      
      if (!res.ok) {
        throw new Error("Error al cargar los reportes");
      }
      return await res.json(); 
    },
  });
};