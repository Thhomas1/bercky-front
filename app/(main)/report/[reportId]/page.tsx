"use client";

import { use } from "react";
import ReportPreview from "@/components/ReportPreview";

export default function ReportPage({ params }: { params: Promise<{ reportId: string }> }) {
  const { reportId } = use(params);
  return <ReportPreview id={Number(reportId)} />;
}