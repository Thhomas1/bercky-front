"use client";

import { Lock, PawPrint } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export const ErrorForm = () => {
  return (
    <main className="flex justify-center px-4 py-12 pb-28 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
        className="bg-card w-full max-w-lg overflow-hidden rounded-2xl border border-black/5 p-8 text-center shadow-lg dark:border-white/5"
      >
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10">
          <PawPrint className="h-12 w-12 text-blue-500" strokeWidth={1.5} />
        </div>
        <h2 className="text-foreground mb-3 text-2xl font-bold sm:text-3xl">
          ¡Alto ahí! 🐾
        </h2>
        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
          Tenés que estar logueado para poder crear un reporte. Iniciá sesión o
          registrate rápido para sumarte a la comunidad bernalense!
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/auth/login"
            className="group flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:scale-[1.02] hover:bg-blue-600 active:scale-95"
          >
            <Lock className="h-4 w-4" />
            <span>Ingresar</span>
          </Link>
          <Link
            href="/auth/register"
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-transparent px-6 py-3 text-sm font-semibold text-zinc-700 transition-all duration-200 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            <span>Registrarse</span>
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default ErrorForm;
