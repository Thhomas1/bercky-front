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
  ];

export const Shelters = () => {

  return (
    <section className="mx-auto mt-12 max-w-4xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 text-center backdrop-blur-sm">
       <h2 className="mb-8 text-xl font-bold tracking-tight text-zinc-100 sm:text-2xl">
        Si querés ayudar al pueblo, Doná a los refugios!
      </h2>
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
        {shelters.map((shelter) => (
          <Link
            key={shelter.id}
            href={shelter.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800 p-2 transition-all duration-300 hover:scale-105 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-xl sm:h-28 sm:w-28">
              <Image
                src={shelter.logo}
                alt={shelter.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 scale-0 rounded-lg bg-zinc-950 border border-zinc-800 px-3 py-1.5 text-xs font-medium text-white transition-all group-hover:scale-100 whitespace-nowrap shadow-xl">
              {shelter.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Shelters;