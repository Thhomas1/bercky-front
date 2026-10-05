import { Status } from "./enums";

export interface Animal {
  id: number;
  name: string;
  breed: string;
  size: string;
  status: string;
  type: string;
  age: number;
}
export const statusStyles: Record<Status, string> = {
  [Status.Perdido]: "bg-red-500/10 text-red-600 dark:text-red-400",
  [Status.Encontrado]:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  [Status.Transito]: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
};
