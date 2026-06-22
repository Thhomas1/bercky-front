export type AnimalStatus = "perdido" | "encontrado" | "en transito";

export interface Report {
  id: number;
  animalName: string;
  status: AnimalStatus;
  zone: string;
  timeAgo: string;
  imageUrl: string | null;
}