"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetUser } from "@/hooks/useGetUser";
import { Button } from "@/components/ui/button";

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();

  const userId = Number(params.userid);

  const { data: user, isLoading, isError } = useGetUser(userId);

  if (isLoading) {
    return (
      <p className="text-muted-foreground p-10 text-center">
        Cargando perfil...
      </p>
    );
  }

  if (isError || !user || isNaN(userId)) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-10">
        <p className="text-red-400">No se pudo cargar el perfil del usuario.</p>
        <Button variant="outline" onClick={() => router.back()}>
          Volver atrás
        </Button>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="text-muted-foreground hover:text-foreground mb-6"
      >
        &larr; Volver
      </Button>

      <h1 className="font-display text-foreground text-3xl">
        Perfil del Reportero
      </h1>

      <div className="border-border bg-card mt-6 rounded-xl border p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground text-sm">Nombre</p>
            <p className="text-lg font-medium capitalize">
              {user.name} {user.lastname}
            </p>
          </div>

          {user.mail && (
            <div>
              <p className="text-muted-foreground text-sm">Email de contacto</p>
              <p className="text-lg font-medium">{user.mail}</p>
            </div>
          )}

          {user.phonenumber && (
            <div>
              <p className="text-muted-foreground text-sm">Teléfono</p>
              <p className="text-lg font-medium">{user.phonenumber}</p>
            </div>
          )}

          <div>
            <p className="text-muted-foreground text-sm">Zona de actividad</p>
            <p className="text-lg font-medium">
              {user.zone || "No especificada"}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
