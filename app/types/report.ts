export type AnimalStatus = "perdido" | "encontrado" | "en transito";

export interface Report {
  id: number;
  animalName: string;
  status: AnimalStatus;
  zone: string;
  timeAgo: string;
  imageUrl: string | null;
}

export interface ReportDetail {
  id: number;
  animalName: string;
  status: AnimalStatus;
  zone: string;
  timeAgo: string;
  imageUrl: string | null;
  description: string;
  lat: number;
  lng: number;
}
