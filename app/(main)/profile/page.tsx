"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/hooks/useGetProfile";
import { useGetMyReports } from "@/hooks/useGetMyReports";
import { Report } from "@/types/report";

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetProfile();

  const { data: reports = [], isLoading: isLoadingReports } = useGetMyReports();

  useEffect(() => {
    if (isError) {
      router.push("auth/login");
    }
  }, [isError, router]);

  if (isLoading) {
    return <p className="text-muted-foreground p-10">Cargando perfil...</p>;
  }

  if (isError || !user) return null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <h1 className="font-display text-foreground text-3xl">Mi Perfil</h1>

      <div className="border-border bg-card mt-6 rounded-xl border p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">Nombre completo</p>
            <p className="text-lg font-medium">
              {user.name} {user.lastname}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Email</p>
            <p className="text-lg font-medium">{user.mail}</p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Teléfono</p>
            <p className="text-lg font-medium">
              {user.phonenumber || "No especificado"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground text-sm">Zona</p>
            <p className="text-lg font-medium">
              {user.zone || "No especificada"}
            </p>
          </div>
        </div>
      </div>

      <h2 className="font-display text-foreground mt-8 text-2xl">
        Mis Reportes
      </h2>

      <div className="border-border bg-card mt-4 rounded-xl border p-6 shadow-sm">
        {isLoadingReports ? (
          <p className="text-muted-foreground text-sm">Cargando reportes...</p>
        ) : reports.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No tienes reportes creados.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {reports.map((report: Report) => (
              <div
                key={report.id}
                className="border-border rounded-lg border p-4"
              >
                <div className="flex items-start justify-between">
                  <p className="text-foreground font-medium">
                    {report.description || "Sin descripción"}
                  </p>
                  <span className="bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-xs capitalize">
                    {report.istransit}
                  </span>
                </div>
                {report.spotted && (
                  <p className="text-muted-foreground mt-2 text-sm">
                    Visto en: {report.spotted}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
