import { Animal } from "./animal";
import { User } from "./user";
import { Status } from "./enums";

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
  status?: Status | null;
}

export interface ReportLocation {
  lat: number;
  lng: number;
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
  location: ReportLocation | null;
}
