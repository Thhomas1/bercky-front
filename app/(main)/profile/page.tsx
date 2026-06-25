"use client";

import Image from "next/image";
import { MapPin, Clock, Mail, CalendarDays } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { mockUser, mockUserReports } from "@/lib/mocks";
import type { Report, AnimalStatus } from "@/types/report";
import PennantDivider from "@/components/PennantDivider";

const statusStyles: Record<AnimalStatus, string> = {
  perdido: "bg-red-500/10 text-red-600 dark:text-red-400",
  encontrado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "en transito": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

function UserReportRow({ report }: { report: Report }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/5 bg-card dark:border-white/5">
      <div className="aspect-video w-full bg-muted">
        {report.imageUrl ? (
          <Image
            src={report.imageUrl}
            alt={report.animalName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Sin foto
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-semibold text-foreground">
            {report.animalName}
          </h4>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusStyles[report.status]}`}
          >
            {report.status}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span>{report.zone}</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span>{report.timeAgo}</span>
        </div>
      </div>
    </div>
  );
}

function ProfileInfo() {
  return (
    <div className="flex flex-col items-center text-center md:items-start md:text-left">
      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-muted">
        {/* TODO: foto real del usuario cuando exista avatarUrl */}
        <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-muted-foreground">
          {mockUser.name.charAt(0).toUpperCase()}
        </div>
      </div>
      <h1 className="mt-4 font-display text-2xl text-foreground sm:text-3xl">
        {mockUser.name}
      </h1>
      <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-1.5 md:justify-start">
          <Mail className="h-4 w-4" strokeWidth={1.75} />
          <span>{mockUser.email}</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 md:justify-start">
          <CalendarDays className="h-4 w-4" strokeWidth={1.75} />
          <span>
            Miembro desde{" "}
            {new Date(mockUser.created_at).toLocaleDateString("es-AR", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}

export const Profile = () => {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 pb-28 sm:px-6">
      <div className="flex flex-col gap-8 md:flex-row md:gap-6">
        <div className="md:w-1/3">
          <ProfileInfo />
        </div>
        <Separator className="md:hidden" />
        <PennantDivider />
        <div className="flex-1">
          <h2 className="mb-4 text-lg font-bold text-foreground sm:text-xl">
            Tus reportes
          </h2>
          <div className="flex flex-col gap-4">
            {mockUserReports.map((report) => (
              <UserReportRow key={report.id} report={report} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;