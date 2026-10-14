import { Status } from "@/types/enums";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filters: { label: string; value: Status | null }[] = [
  { label: "Todos", value: null },
  { label: "Perdidos", value: Status.Perdido },
  { label: "En tránsito", value: Status.Transito },
  { label: "Encontrados", value: Status.Encontrado },
];
