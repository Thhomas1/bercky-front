"use client"

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "¿Cómo publico una mascota perdida?",
      answer: "Hacé click en el botón de registrar pérdida, logeate con tu cuenta, subí una foto clara de tu animal, indicá la zona exacta de Bernal/Quilmes donde se perdió y dejá un teléfono de contacto."
    },
    {
      question: "¿La aplicación tiene algún costo?",
      answer: "No, Bercky es 100% gratuita y colaborativa. El objetivo es ayudar a que los animalitos vuelvan con sus familias lo antes posible."
    },
    {
      question: "Encontré un perro en la calle, ¿qué hago?",
      answer: "Podés crear una publicación de tránsito o hallazgo en nuestra sección de reportes. Intentá retenerlo si es seguro, sacale una foto y subila detallando la intersección de calles para que sus dueños lo reconozcan."
    },
    {
      question: "¿Cómo puedo colaborar con los refugios de Bernal?",
      answer: "En la sección de refugios tenés los accesos directos a sus redes oficiales. Podés ayudarlos donando, alimento balanceado, mantas o postulándote como hogar de tránsito temporal."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto mt-16 max-w-4xl px-4">
      <h2 className="text-center text-xl font-semibold text-zinc-200 sm:text-2xl mb-8">
        Preguntas Frecuentes
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index} 
              className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm transition-colors duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between p-5 text-left font-medium text-zinc-300 hover:text-emerald-400 transition-colors"
              >
                <span>{item.question}</span>
                <span className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : 'text-zinc-500'}`}>
                  ▼
                </span>
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 border-t border-zinc-800/50 p-5 text-zinc-400" : "max-h-0"
                }`}
              >
                <p className="text-sm leading-relaxed">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}