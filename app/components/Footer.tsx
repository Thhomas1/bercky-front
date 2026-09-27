"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 w-full border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider text-white">
              🦮 Bercky
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-zinc-500">
            Conectando a la comunidad de Bernal para ayudar a que las mascotas
            perdidas vuelvan a su hogar.
          </p>
          <div className="flex gap-4 pt-2">
            <Link
              href="#"
              className="text-lg transition-colors hover:text-emerald-400"
            >
              📸
            </Link>
            <Link
              href="#"
              className="text-lg transition-colors hover:text-emerald-400"
            >
              🌐
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider text-zinc-200 uppercase">
            Enlaces Rápidos
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-emerald-400"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/report"
                className="transition-colors hover:text-emerald-400"
              >
                Reportar Pérdida
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider text-zinc-200 uppercase">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Bernal, Provincia de Buenos Aires</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a
                href="mailto:soporte@bercky.app"
                className="transition-colors hover:text-emerald-400"
              >
                thomasromero0921@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 border-t border-zinc-900 bg-black/40 px-6 py-6 text-center text-xs text-zinc-600 sm:flex-row sm:justify-between">
        <p>© 2026 Bercky. Open Source ahora y siempre.</p>
        <p>
          Diseñado con <span className="text-red-500">❤️</span> para los
          animalitos por{" "}
          <span className="font-medium text-zinc-400">Bercky</span>
        </p>
      </div>
    </footer>
  );
}
