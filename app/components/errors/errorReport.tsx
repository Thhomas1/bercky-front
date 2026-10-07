"use client";

import { SearchX, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export const ErrorReport = () => {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
        className="flex flex-col items-center"
      >
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
          <SearchX className="h-10 w-10 text-red-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-foreground mb-2 text-2xl font-bold">
          ¡Ups! Reporte no encontrado
        </h2>
        <p className="text-muted-foreground mb-8 max-w-sm text-sm leading-relaxed">
          Inicia sesion arriba para poder el detalle de los reportes!
        </p>
        <Link
          href="/"
          className="group flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] hover:bg-blue-600 active:scale-95"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver al inicio</span>
        </Link>
      </motion.div>
    </main>
  );
};

export default ErrorReport;
