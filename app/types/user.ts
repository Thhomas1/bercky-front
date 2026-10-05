export interface Role {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role?: Role;
  created_at: Date;
  supabase_id?: string;
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

export interface UpdateUser {
  name?: string;
  lastname?: string;
  phonenumber?: string;
  zone?: string;
}
