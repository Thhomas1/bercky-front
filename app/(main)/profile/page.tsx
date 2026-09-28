"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/hooks/useGetProfile";

export default function ProfilePage() {
  const router = useRouter();
  const { data: user, isLoading, isError } = useGetProfile();

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
    </main>
  );
}
