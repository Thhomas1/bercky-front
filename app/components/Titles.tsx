"use client";

import { motion } from "motion/react";
import { Separator } from "@/components/ui/separator";

export const Titles = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center px-4 py-16 text-center sm:py-24"
      >
        <h1 className="font-display text-4xl text-foreground sm:text-5xl md:text-6xl">
          Buscá a tu compañero
        </h1>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          Si no lo encontrás acá abajo, subí el reporte y dejá que toda la
          comunidad te ayude a encontrarlo.
        </p>
      </motion.div>

      <Separator className="mb-10 w-3.5" />
    </>
  );
};

export default Titles;