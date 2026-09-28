"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const Titles = () => {
  const [index, setIndex] = useState(0);

  const words = ["animal", "perrito", "gatito", "pichi", "michu", "amigo"];

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
        <h1 className="font-display text-foreground flex min-h-[7rem] flex-col items-center justify-center gap-x-3 gap-y-1 text-4xl font-bold tracking-tight sm:min-h-0 sm:flex-row sm:text-5xl md:text-6xl">
          <span>Buscá a tu</span>
          <span className="relative inline-block h-[1.2em] w-full overflow-hidden text-center sm:w-[260px] sm:text-left md:w-[320px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="block w-full translate-y-[3px] transform bg-gradient-to-r from-blue-600 via-blue-400 to-sky-400 bg-clip-text font-extrabold text-transparent sm:w-auto"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        <p className="text-muted-foreground mt-6 max-w-lg text-base leading-relaxed sm:text-lg">
          Si no lo encontrás acá abajo, subí el reporte y dejá que toda la
          comunidad te ayude a encontrarlo.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-10 flex w-full flex-wrap items-center justify-center gap-4 sm:w-auto"
        >
          <Link
            href="/report/create"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-102 hover:bg-emerald-400 active:scale-98 sm:w-auto"
          >
            <span>📢</span>
            <span>Registrar Pérdida</span>
          </Link>

          <Link
            href="/report"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 hover:text-white sm:w-auto"
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
