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
  zonereport: string;
  spotted: string;
  istransit: boolean;
  description: string;
  photo: string | null;
  createdat: string;
  user: {
    id: number;
    name: string;
    lastname: string;
    phonenumber: string;
    zone: string;
    photo: string | null;
    mail: string;
    role_id: number;
  };
  animal: {
    id: number;
    name: string;
    breed: string;
    size: string;
    status: string;
    type: string;
    age: number;
  };
}