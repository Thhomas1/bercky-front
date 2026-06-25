import { Comment } from "@/types/comment";
import { Report, ReportDetail } from "@/types/report";
import { User } from "@/types/user";


export const mockUser: User = {
  id: 1,
  name: "Tho",
  email: "tho@bercky.com",
  created_at: new Date("2026-03-12"),
};

export const mockUserReports: Report[] = [
  {
    id: 10,
    animalName: "Toby",
    status: "perdido",
    zone: "Quilmes Centro",
    timeAgo: "hace 2 horas",
    imageUrl: null,
  },
  {
    id: 11,
    animalName: "Coco",
    status: "encontrado",
    zone: "Don Bosco",
    timeAgo: "hace 3 días",
    imageUrl: null,
  },
];

// Mock temporal de reportes de la comunidad (Home) — después viene de GET /reports
export const mockReports: Report[] = [
  {
    id: 1,
    animalName: "Toby",
    status: "perdido",
    zone: "Quilmes Centro",
    timeAgo: "hace 2 horas",
    imageUrl: null,
  },
  {
    id: 2,
    animalName: "Luna",
    status: "encontrado",
    zone: "Bernal",
    timeAgo: "hace 5 horas",
    imageUrl: null,
  },
  {
    id: 3,
    animalName: "Rocky",
    status: "perdido",
    zone: "Ezpeleta",
    timeAgo: "hace 1 día",
    imageUrl: null,
  },
  {
    id: 4,
    animalName: "Mía",
    status: "en transito",
    zone: "Don Bosco",
    timeAgo: "hace 2 días",
    imageUrl: null,
  },
];

// Mock temporal — después viene de GET /reports/:id
export const mockReportDetail: ReportDetail = {
  id: 1,
  animalName: "Toby",
  status: "perdido",
  zone: "Quilmes Centro",
  timeAgo: "hace 2 horas",
  imageUrl: null,
  description:
    "Se escapó por el portón de calle Rivadavia al 200. Es muy cariñoso, no muerde. Lleva collar marrón sin chapita. Cualquier dato ayuda, aunque sea que lo vieron pasar.",
  lat: -34.7206,
  lng: -58.2547,
};

// Mock temporal — después viene de GET /reports/:id/comments
export const mockComments: Comment[] = [
  {
    id: 1,
    author: { id: 2, name: "Marina G." },
    content: "Lo vi esta mañana cerca de la plaza Conesa, iba solo.",
    timeAgo: "hace 1 hora",
    lat: -34.7188,
    lng: -58.2561,
  },
  {
    id: 2,
    author: { id: 3, name: "Diego R." },
    content: "Yo le di agua frente a mi casa hace un rato, estaba asustado pero bien.",
    timeAgo: "hace 40 minutos",
    lat: -34.7195,
    lng: -58.2533,
  },
  {
    id: 3,
    author: { id: 4, name: "Sole P." },
    content: "Avisé a la veterinaria de la zona por si lo llevan ahí.",
    timeAgo: "hace 15 minutos",
    lat: null,
    lng: null,
  },
];