export type AnimalStatus = "perdido" | "encontrado" | "en transito";

export interface Report {
  id: number;
  zonereport: string;
  spotted: string;
  istransit: boolean;
  description: string;
  photo: string | null;
  user_id: number;
  animal_id: number;
  createdat: string;
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
