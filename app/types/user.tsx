export interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

export interface UserWithToken {
  user: User;
  token: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}