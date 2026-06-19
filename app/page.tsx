import { MapPin, Clock } from "lucide-react";

// Mock temporal — esto después viene del backend (GET /reports)
const mockReports = [
  {
    id: 1,
    animalName: "Toby",
    status: "perdido" as const,
    zone: "Quilmes Centro",
    timeAgo: "hace 2 horas",
    imageUrl: null,
  },
  {
    id: 2,
    animalName: "Luna",
    status: "encontrado" as const,
    zone: "Bernal",
    timeAgo: "hace 5 horas",
    imageUrl: null,
  },
  {
    id: 3,
    animalName: "Rocky",
    status: "perdido" as const,
    zone: "Ezpeleta",
    timeAgo: "hace 1 día",
    imageUrl: null,
  },
  {
    id: 4,
    animalName: "Mía",
    status: "en transito" as const,
    zone: "Don Bosco",
    timeAgo: "hace 2 días",
    imageUrl: null,
  },
];

const statusStyles: Record<string, string> = {
  perdido: "bg-red-500/10 text-red-600 dark:text-red-400",
  encontrado: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "en transito": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

function ReportCard({ report }: { report: (typeof mockReports)[number] }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-black/5 bg-card shadow-sm transition-shadow hover:shadow-md dark:border-white/5">
      {/* Imagen */}
      <div className="aspect-square w-full bg-muted">
        {report.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={report.imageUrl}
            alt={report.animalName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
            Sin foto
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground">
            {report.animalName}
          </h3>
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
    </article>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-6 pb-28">
      <h1 className="mb-5 text-2xl font-bold text-foreground">
        Reportes
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mockReports.map((report) => ( // changear este map con el famoso get.reports
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </main>
  );
}