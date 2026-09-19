import { User } from "./user";

export interface CommentAuthor {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  content: string;
  report_id: number;
  user: User;
  createdat: string;
  photo: string | null;
}