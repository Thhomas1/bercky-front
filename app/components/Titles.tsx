"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const Titles = () => {
  const [index, setIndex] = useState(0);

  const words = [
    "animal",
    "perrito",
    "gatito",
    "pichi",
    "michu",
    "amigo",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-4 py-16 text-center sm:py-24"
      >
        <span className="inline-flex items-center rounded-full bg-blue-950/40 px-3 py-1 text-xs font-semibold text-sky-400 ring-1 ring-inset ring-blue-500/30 mb-6">
          📍 Red Comunitaria de Bernal
        </span>
        <h1 className="font-display text-4xl text-foreground sm:text-5xl md:text-6xl font-bold tracking-tight flex flex-col sm:flex-row items-center justify-center gap-x-3 gap-y-1 min-h-[7rem] sm:min-h-0">
          <span>Buscá a tu </span>
          <span className="relative inline-block overflow-hidden h-[1.2em] w-full sm:w-[260px] md:w-[320px] text-center sm:text-left">
             <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full sm:w-auto transform translate-y-[3px] bg-gradient-to-r from-blue-600 via-blue-400 to-sky-400 bg-clip-text text-transparent font-extrabold block"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          Si no lo encontrás acá abajo, subí el reporte y dejá que toda la
          comunidad te ayude a encontrarlo.
        </p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/report"
            className="group flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:bg-emerald-400 hover:scale-102 active:scale-98 w-full sm:w-auto"
          >
            <span>📢</span>
            <span>Registrar Pérdida</span>
          </Link>

          <Link
            href="/report"
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:bg-zinc-900/80 hover:border-zinc-700 hover:text-white w-full sm:w-auto"
          >
            <span>🗺️</span>
            <span>Ver Reportes</span>
          </Link>
        </motion.div>
      </motion.div>

      <div className="flex justify-center">
        <Separator className="mb-10 w-3.5" />
      </div>
    </>
  );
};

export default Titles;
