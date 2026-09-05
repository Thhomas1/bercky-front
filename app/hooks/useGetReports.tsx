import { useQuery } from "@tanstack/react-query";

export const GET_REPORTS_QUERY_KEY = "get-reports" as const;

export const useGetReports = () => {
  return useQuery({
    queryKey: [GET_REPORTS_QUERY_KEY],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Error al cargar los reportes");
      return res.json();
    },
  });
};