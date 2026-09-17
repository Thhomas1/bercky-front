export interface CommentAuthor {
  id: number;
  name: string;
}

// export interface Comment {
//   id: number;
//   author: CommentAuthor;
//   content: string;
//   timeAgo: string;
//   lat: number | null;
//   lng: number | null;
// }
export interface Comment {
  id: number;
  content: string;
  report_id: number;
  user_id: number;
  createdat: string;
  photo: string | null;
}