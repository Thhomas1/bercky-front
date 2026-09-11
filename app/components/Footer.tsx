"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 bg-zinc-950 text-zinc-400 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-wider">🦮 Bercky</span>
          </div>
          <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
            Conectando a la comunidad de Bernal para ayudar a que las mascotas perdidas vuelvan a su hogar.
          </p>
          <div className="flex gap-4 pt-2">
            <Link href="#" className="hover:text-emerald-400 transition-colors text-lg">📸</Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors text-lg">🌐</Link>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-200 tracking-wider uppercase">
            Enlaces Rápidos
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Inicio</Link></li>
            <li><Link href="/report" className="hover:text-emerald-400 transition-colors">Reportar Pérdida</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-zinc-200 tracking-wider uppercase">
            Contacto
          </h3>
          <ul className="space-y-3 text-sm text-zinc-500">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Bernal, Provincia de Buenos Aires</span>
            </li>
            <li className="flex items-center gap-2">
              <span>✉️</span>
              <a href="mailto:soporte@bercky.app" className="hover:text-emerald-400 transition-colors">
                thomasromero0921@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-900 bg-black/40 py-6 text-center text-xs text-zinc-600 px-6 flex flex-col sm:flex-row sm:justify-between max-w-6xl mx-auto gap-2">
        <p>© 2026 Bercky. Open Source ahora y siempre.</p>
        <p>
          Diseñado con <span className="text-red-500">❤️</span> para los animalitos por{" "}
          <span className="text-zinc-400 font-medium">Bercky</span>
        </p>
      </div>
    </footer>
  );
}
