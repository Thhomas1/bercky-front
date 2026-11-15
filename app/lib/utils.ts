import { Status } from "@/types/enums";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ACCEPTED_IMAGE_TYPES = "image/jpeg,image/png,image/webp";
const MAX_IMAGE_MB = 10;

export const validateImage = (files?: FileList) => {
  const file = files?.[0];
  if (!file) return true;
  if (!ACCEPTED_IMAGE_TYPES.split(",").includes(file.type))
    return "Solo se permiten imágenes JPG, PNG o WebP";
  if (file.size > MAX_IMAGE_MB * 1024 * 1024)
    return `La imagen no puede superar los ${MAX_IMAGE_MB}MB`;
  return true;
};

export const filters: { label: string; value: Status | null }[] = [
  { label: "Todos", value: null },
  { label: "Perdidos", value: Status.Perdido },
  { label: "En tránsito", value: Status.Transito },
  { label: "Encontrados", value: Status.Encontrado },
];
