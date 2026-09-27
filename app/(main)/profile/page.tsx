"use client";

import Image from "next/image";
import {
  MapPin,
  Clock,
  Mail,
  CalendarDays,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import type { Report } from "@/types/report";
import { Status } from "@/types/enums";
import { useGetProfile } from "@/hooks/useGetProfile";

const statusStyles: Record<Status, string> = {
  perdido: "bg-red-500/10 text-red-600 dark:text-red-400",
  encontrado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "en transito": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

interface UserReportRowProps {
  report: Report;
}

function UserReportRow({ report }: UserReportRowProps) {
  return (
    <div className="bg-card overflow-hidden rounded-xl border border-black/5 shadow-sm transition-all hover:shadow-md dark:border-white/5">
      <div className="bg-muted relative aspect-video w-full">
        {report.photo ? (
          <Image
            src={report.photo}
            alt={report.description || "Reporte"}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="text-muted-foreground flex h-full w-full items-center justify-center text-sm">
            Sin foto
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-foreground line-clamp-1 font-semibold">
            {report.description}
          </h4>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
              statusStyles[report.istransit ? "en transito" : "perdido"] ||
              "bg-secondary text-secondary-foreground"
            }`}
          >
            {report.istransit}
          </span>
        </div>

        <div className="text-muted-foreground flex items-center gap-1.5 text-sm">
          <MapPin className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
          <span className="truncate">{report.spotted}</span>
        </div>

        <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
          <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
          <span>{report.createdat}</span>
        </div>
      </div>
    </div>
  );
}

interface ProfileInfoProps {
  user: {
    name: string;
    mail: string; // Coincide con tu columna 'mail' en base de datos
    created_at?: Date | string;
    role?: string;
  };
}

const ProfileInfo = ({ user }: ProfileInfoProps) => {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="bg-muted border-primary/10 relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-2 shadow-inner">
        <div className="text-muted-foreground text-4xl font-bold">
          {user.name ? user.name.charAt(0).toUpperCase() : "U"}
        </div>
      </div>
      <h1 className="font-display text-foreground mt-4 text-2xl font-bold sm:text-3xl">
        {user.name}
      </h1>

      <div className="text-muted-foreground mt-4 flex w-full flex-col gap-2.5 text-sm">
        <div className="flex items-center justify-center gap-2 md:justify-start">
          <Mail className="text-primary h-4 w-4 shrink-0" strokeWidth={1.75} />
          <span className="truncate">{user.mail}</span>
        </div>
        {user.created_at && (
          <div className="flex items-center justify-center gap-2 md:justify-start">
            <CalendarDays
              className="text-primary h-4 w-4 shrink-0"
              strokeWidth={1.75}
            />
            <span>
              Miembro desde{" "}
              {new Date(user.created_at).toLocaleDateString("es-AR", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const Profile = () => {
  const { data: user, isLoading, error } = useGetProfile();

  // Si tus reportes vienen dentro del mismo objeto de usuario o los consultas aparte,
  // puedes mapearlos aquí. Si por ahora usas un array vacío o los del usuario ID 1:
  const reports: Report[] = []; // O user?.reports si el backend te los devuelve juntos

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-3 px-4 text-center">
        <AlertCircle className="text-destructive h-10 w-10" />
        <h3 className="text-lg font-semibold">No se pudo cargar el perfil</h3>
        <p className="text-muted-foreground text-sm">
          Inicia sesión nuevamente o verifica la conexión con el servidor.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 pb-28 sm:px-6">
      <div className="flex flex-col gap-8 md:flex-row md:gap-10">
        <div className="md:w-1/3">
          <ProfileInfo user={user} />
        </div>

        <div className="hidden md:block">
          <Separator orientation="vertical" className="h-full" />
        </div>
        <Separator className="md:hidden" />

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-foreground text-lg font-bold sm:text-xl">
              Tus reportes
            </h2>
            <span className="text-muted-foreground bg-muted rounded-full px-2.5 py-1 text-xs font-medium">
              {reports.length} {reports.length === 1 ? "reporte" : "reportes"}
            </span>
          </div>

          {reports.length === 0 ? (
            <div className="border-border text-muted-foreground flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
              <p className="text-sm">Todavía no creaste ningún reporte.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {reports.map((report) => (
                <UserReportRow key={report.id} report={report} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;
