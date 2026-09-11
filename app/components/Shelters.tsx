"use client";

import Image from "next/image";
import Link from "next/link";


const shelters = [
    {
      id: 1,
      name: "Adopciones Quilmes",
      logo: "/images/refugioQuilmes.jpg",
      instagram: "https://www.instagram.com/adopcionesquilmes/?hl=es-la",
    },
     {
      id: 2,
      name: "Ser Animal",
      logo: "/images/serAnimal.jpg",
      instagram: "https://www.instagram.com/ser.animal/?hl=es",
    },
    // { id: 2, name: "Refugio 2", logo: "/path", instagram: "url" },
  ];

export const Shelters = () => {

  return (
    <section className="mx-auto mt-12 max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center backdrop-blur-sm">
      <h2 className="mb-6 text-lg font-medium text-zinc-200 sm:text-xl">
        Si querés ayudar al pueblo, Doná a los refugios!
      </h2>

      {/* Contenedor responsivo: fila en pantallas chicas, grilla/flex alineado en más grandes */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
        {shelters.map((shelter) => (
          <Link
            key={shelter.id}
            href={shelter.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 p-2 transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-lg sm:h-20 sm:w-20">
              <Image
                src={shelter.logo}
                alt={shelter.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            {/* Tooltip con el nombre al pasar el mouse */}
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 scale-0 rounded bg-zinc-900 px-2 py-1 text-xs text-white transition-all group-hover:scale-100 whitespace-nowrap">
              {shelter.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Shelters;