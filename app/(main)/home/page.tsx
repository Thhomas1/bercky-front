"use client";

import ReportCard, { mockReports } from "@/components/ReportCard";
import Titles from "@/components/Titles";



export default function Home() {
  return (
    <main className="px-4 py-6 pb-28 sm:px-6">
      <Titles />
      <div className="mx-auto max-w-4xl grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 cursor-pointer">
        {mockReports.map((report) => ( // changear este map con el famoso get.reports
          <ReportCard key={report.id} report={report} />
        ))}
      </div>
    </main>
  );
}