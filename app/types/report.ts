import { Animal } from "./animal";
import { User } from "./user";


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
  user: User;
  animal: Animal;
}